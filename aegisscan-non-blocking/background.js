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
//  Fonction pour récupérer le token depuis l'application Tauri
// ─────────────────────────────────────────────
async function tryGetTokenFromTauri() {
  try {
    console.log("[AegisScan Background] 🔍 Recherche du token Tauri...");
    
    // Méthode 1: Lire depuis le fichier temporaire
    const tokenFromFile = await readTokenFromTempFile();
    if (tokenFromFile) {
      console.log("[AegisScan Background] ✅ Token trouvé dans le fichier temporaire");
      return tokenFromFile;
    }
    
    // Méthode 2: Lire depuis le registre Windows
    const tokenFromRegistry = await readTokenFromRegistry();
    if (tokenFromRegistry) {
      console.log("[AegisScan Background] ✅ Token trouvé dans le registre");
      return tokenFromRegistry;
    }
    
    console.log("[AegisScan Background] ❌ Aucun token trouvé depuis Tauri");
    return null;
  } catch (error) {
    console.error("[AegisScan Background] Erreur récupération token Tauri:", error);
    return null;
  }
}

// Lire le token depuis le fichier temporaire
async function readTokenFromTempFile() {
  try {
    // Utiliser l'API File System Access si disponible
    if ('showDirectoryPicker' in window) {
      // Méthode moderne (limitée par les permissions)
      return null;
    }
    
    // Méthode alternative: essayer de lire via fetch (si le fichier est accessible)
    const tempPath = 'file:///tmp/aegisscan_token.json'; // Linux/Mac
    const tempPathWin = 'file:///C:/Users/' + (navigator.userAgent.includes('Windows') ? 'AppData/Local/Temp/aegisscan_token.json' : '');
    
    // Cette méthode ne fonctionnera pas à cause des restrictions CORS
    // Mais on peut essayer d'autres approches
    return null;
  } catch (error) {
    return null;
  }
}

// Lire le token depuis le registre Windows (via extension native messaging si disponible)
async function readTokenFromRegistry() {
  try {
    // Cette fonctionnalité nécessiterait une extension native messaging
    // Pour l'instant, on retourne null
    return null;
  } catch (error) {
    return null;
  }
}

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
    let token = storage.aegisscan_token;
    
    console.log("[AegisScan Background] 🔍 Analyse de:", url);
    console.log("[AegisScan Background] Token présent:", !!token);
    
    // Si pas de token, essayer de le récupérer depuis l'application Tauri
    if (!token) {
      console.log("[AegisScan Background] 🔄 Tentative de récupération du token depuis Tauri...");
      token = await tryGetTokenFromTauri();
      
      if (token) {
        // Stocker le token récupéré
        await chrome.storage.local.set({ aegisscan_token: token });
        console.log("[AegisScan Background] ✅ Token récupéré et stocké depuis Tauri");
      }
    }
    
    if (token) {
      console.log("[AegisScan Background] Token longueur:", token.length);
      console.log("[AegisScan Background] Token début:", token.substring(0, 50) + "...");
    }
    
    if (!token) {
      console.warn("[AegisScan Background] Pas de token d'authentification trouvé - Extension non synchronisée");
      // Retourner safe=true pour ne pas bloquer si pas connecté
      return { safe: true, error: true, message: "Extension non synchronisée - Connectez-vous dans l'application AegisScan Desktop" };
    }

    // Vérifier si le token n'est pas expiré (avec marge de sécurité)
    try {
      console.log("[AegisScan Background] 🔍 Validation du token...");
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const bufferTime = 60; // 60 secondes de marge
      
      console.log("[AegisScan Background] Payload du token:", payload);
      console.log("[AegisScan Background] Expiration:", payload.exp, "Actuel:", currentTime);
      
      if (payload.exp && payload.exp < (currentTime + bufferTime)) {
        console.warn("[AegisScan Background] ❌ Token expiré ou expire bientôt");
        // Supprimer le token expiré
        chrome.storage.local.remove(['aegisscan_token']);
        return { safe: true, error: true, message: "Session expirée - Veuillez vous reconnecter dans l'application" };
      }
      
      const timeLeft = Math.round((payload.exp - currentTime) / 60);
      console.log("[AegisScan Background] ✅ Token valide, expiration dans:", timeLeft, "minutes");
    } catch (tokenError) {
      console.warn("[AegisScan Background] ❌ Erreur validation token:", tokenError);
      console.warn("[AegisScan Background] Token reçu:", token);
      
      // Pour les tokens de test, on continue quand même
      if (token.includes('test-signature')) {
        console.log("[AegisScan Background] ⚠️ Token de test détecté, validation ignorée");
      } else {
        chrome.storage.local.remove(['aegisscan_token']);
        return { safe: true, error: true, message: "Token invalide - Veuillez vous reconnecter" };
      }
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
        canal_source: "Extension Chrome"
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("[AegisScan] Token expiré ou invalide - suppression du token");
        // Supprimer le token expiré du storage
        chrome.storage.local.remove(['aegisscan_token']);
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
    
    // Gestion d'erreur plus détaillée
    if (err.name === 'AbortError') {
      return { safe: true, error: true, message: "Timeout d'analyse (5s)" };
    }
    
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      return { safe: true, error: true, message: "Backend AegisScan inaccessible" };
    }
    
    if (err.name === 'DOMException') {
      return { safe: true, error: true, message: "Erreur de connexion réseau" };
    }
    
    return { safe: true, error: true, message: `Erreur: ${err.message || 'Connexion impossible'}` };
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
    console.log("[AegisScan Background] 📨 Demande de synchronisation token reçue");
    
    try {
      if (message.token) {
        console.log("[AegisScan Background] 🔍 Validation du token reçu...");
        
        // Valider le token avant de le stocker
        try {
          const payload = JSON.parse(atob(message.token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          if (payload.exp && payload.exp < currentTime) {
            console.warn("[AegisScan Background] ❌ Tentative de synchronisation avec un token expiré");
            sendResponse({ success: false, error: "Token expiré" });
            return true;
          }
          
          const timeLeft = Math.round((payload.exp - currentTime) / 60);
          console.log("[AegisScan Background] ✅ Token valide reçu, expiration dans:", timeLeft, "minutes");
        } catch (validationError) {
          console.warn("[AegisScan Background] ❌ Token reçu invalide:", validationError);
          sendResponse({ success: false, error: "Token invalide" });
          return true;
        }
        
        console.log("[AegisScan Background] 💾 Stockage du token...");
        
        chrome.storage.local.set({ aegisscan_token: message.token }).then(() => {
          console.log("[AegisScan Background] ✅ Token synchronisé avec succès depuis l'application");
          sendResponse({ success: true });
        }).catch((error) => {
          console.error("[AegisScan Background] ❌ Erreur lors du stockage du token:", error);
          sendResponse({ success: false, error: error.message });
        });
      } else {
        console.log("[AegisScan Background] 🗑️ Suppression du token...");
        
        chrome.storage.local.remove(['aegisscan_token']).then(() => {
          console.log("[AegisScan Background] ✅ Token supprimé avec succès");
          sendResponse({ success: true });
        }).catch((error) => {
          console.error("[AegisScan Background] ❌ Erreur lors de la suppression du token:", error);
          sendResponse({ success: false, error: error.message });
        });
      }
    } catch (error) {
      console.error("[AegisScan Background] ❌ Erreur générale lors de la synchronisation:", error);
      sendResponse({ success: false, error: error.message });
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
