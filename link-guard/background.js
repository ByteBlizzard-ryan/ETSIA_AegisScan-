// ─────────────────────────────────────────────
//  LinkGuard — Background Service Worker
//  Reçoit une URL → appelle l'API → renvoie le résultat
// ─────────────────────────────────────────────

// ⚙️  CONFIGURATION — AegisScan API
const API_URL = "http://localhost:3000/analyse-lien/process";   // URL de votre API AegisScan
const API_KEY = "";                                             // Pas de clé API, on utilise JWT

// Cache en mémoire pour éviter d'appeler l'API deux fois pour le même lien
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ─────────────────────────────────────────────
//  Fonction principale : analyse une URL
// ─────────────────────────────────────────────
async function analyzeUrl(url) {
  // Ignorer les liens internes du navigateur
  if (!url || url.startsWith("chrome://") || url.startsWith("about:") || url.startsWith("edge://")) {
    return { safe: true, cached: true };
  }

  // Vérifier le cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { ...cached.result, cached: true };
  }

  try {
    // Récupérer le token JWT depuis le storage de l'extension
    const storage = await chrome.storage.local.get(['aegisscan_token']);
    const token = storage.aegisscan_token;
    
    if (!token) {
      console.warn("[AegisScan] Pas de token d'authentification trouvé");
      // Retourner safe=true pour ne pas bloquer si pas connecté
      return { safe: true, error: true, message: "Non connecté à AegisScan" };
    }

    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    // Timeout plus court pour éviter de bloquer longtemps
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 secondes max

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ 
        url,
        canal_source: "Extension Navigateur"
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("[AegisScan] Token expiré ou invalide");
        return { safe: true, error: true, message: "Session expirée" };
      }
      console.warn("[AegisScan] API error:", response.status);
      return { safe: true, error: true, message: `Erreur API: ${response.status}` };
    }

    const data = await response.json();

    // Adapter la réponse de l'API AegisScan
    const isSafe = data.niveau_risque === 'sûr';
    const isBlocked = data.statut === 'bloqué';

    const result = {
      safe: isSafe && !isBlocked,
      url,
      niveau_risque: data.niveau_risque,
      score_risque: data.score_risque,
      verdict: data.analyse_verdict_final,
      statut: data.statut,
      cached: data.cached || false,
      raw: data,
    };

    // Mise en cache
    cache.set(url, { result, timestamp: Date.now() });

    return result;

  } catch (err) {
    console.error("[AegisScan] Fetch error:", err);
    
    // En cas d'erreur réseau, ne pas bloquer la navigation
    if (err.name === 'AbortError') {
      return { safe: true, error: true, message: "Timeout d'analyse" };
    }
    
    return { safe: true, error: true, message: "Erreur de connexion" };
  }
}

// ─────────────────────────────────────────────
//  Écoute les messages des content scripts
// ─────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ANALYZE_URL") {
    analyzeUrl(message.url).then(sendResponse);
    return true; // Indique une réponse asynchrone
  }
  
  // Synchroniser le token depuis l'application web
  if (message.type === "SET_TOKEN") {
    if (message.token) {
      chrome.storage.local.set({ aegisscan_token: message.token }).then(() => {
        console.log("[AegisScan] Token synchronisé avec succès");
        sendResponse({ success: true });
      });
    } else {
      chrome.storage.local.remove(['aegisscan_token']).then(() => {
        console.log("[AegisScan] Token supprimé avec succès");
        sendResponse({ success: true });
      });
    }
    return true;
  }
  
  // Obtenir le statut de connexion
  if (message.type === "GET_STATUS") {
    chrome.storage.local.get(['aegisscan_token']).then((storage) => {
      sendResponse({ 
        connected: !!storage.aegisscan_token,
        hasToken: !!storage.aegisscan_token
      });
    });
    return true;
  }
  
  // Afficher une notification système
  if (message.type === "SHOW_NOTIFICATION") {
    if (chrome.notifications) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: message.title,
        message: message.message
      });
    }
    sendResponse({ success: true });
    return true;
  }
});
