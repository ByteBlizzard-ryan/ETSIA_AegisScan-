// ─────────────────────────────────────────────
//  LinkGuard — Content Script NON-BLOQUANT
//  Analyse les liens APRÈS navigation, sans jamais bloquer
// ─────────────────────────────────────────────

(function () {
  // Éviter double injection
  if (window.__linkGuardActive) return;
  window.__linkGuardActive = true;

  console.log('[AegisScan Extension] Content script NON-BLOQUANT chargé');

  // Vérifier la disponibilité de l'API Chrome
  const isChromeExtensionContext = () => {
    return typeof chrome !== 'undefined' && 
           chrome.runtime && 
           chrome.runtime.sendMessage && 
           chrome.runtime.id;
  };

  // État de l'extension
  let extensionReady = false;
  let hasToken = false;

  // Vérifier l'état au démarrage
  setTimeout(() => {
    extensionReady = isChromeExtensionContext();
    console.log('[AegisScan Extension] État:', extensionReady ? 'Connectée' : 'Déconnectée');
    
    if (extensionReady) {
      // Annoncer la présence de l'extension
      window.postMessage({
        type: 'AEGISSCAN_EXTENSION_READY',
        source: 'aegisscan-extension',
        timestamp: Date.now()
      }, '*');
      console.log('[AegisScan Extension] Signal de présence envoyé');
    }
  }, 100);

  // Écouter les messages de synchronisation depuis l'application web
  window.addEventListener('message', async (event) => {
    if (event.data.source !== 'aegisscan-web') return;
    
    console.log('[AegisScan Extension] Message reçu:', event.data.type, 'Mode:', event.data.mode || 'web');
    
    if (event.data.type === 'AEGISSCAN_TOKEN_SYNC') {
      try {
        if (extensionReady && isChromeExtensionContext()) {
          await chrome.runtime.sendMessage({
            type: 'SET_TOKEN',
            token: event.data.token
          });
          hasToken = true;
          console.log(`[AegisScan Extension] Token synchronisé depuis l'application ${event.data.mode || 'web'}`);
        } else {
          console.warn('[AegisScan Extension] Extension non prête pour sync token');
        }
      } catch (error) {
        console.error('[AegisScan Extension] Erreur sync token:', error);
        extensionReady = false; // Marquer comme déconnectée
      }
    }
    
    if (event.data.type === 'AEGISSCAN_TOKEN_CLEAR') {
      try {
        if (extensionReady && isChromeExtensionContext()) {
          await chrome.runtime.sendMessage({
            type: 'SET_TOKEN',
            token: null
          });
          hasToken = false;
          console.log(`[AegisScan Extension] Token supprimé (mode: ${event.data.mode || 'web'})`);
        } else {
          console.warn('[AegisScan Extension] Extension non prête pour clear token');
        }
      } catch (error) {
        console.error('[AegisScan Extension] Erreur suppression token:', error);
        extensionReady = false; // Marquer comme déconnectée
      }
    }

    // Répondre aux vérifications de présence de l'extension
    if (event.data.type === 'AEGISSCAN_EXTENSION_CHECK') {
      try {
        const appMode = event.data.mode || 'web';
        const appOrigin = event.data.origin || window.location.origin;
        
        console.log(`[AegisScan Extension] Réponse à la vérification de présence (app mode: ${appMode})`);
        window.postMessage({
          type: 'AEGISSCAN_EXTENSION_RESPONSE',
          source: 'aegisscan-extension',
          available: extensionReady,
          hasToken: hasToken,
          timestamp: Date.now(),
          version: '1.1.0',
          appMode: appMode,
          appOrigin: appOrigin,
          supportsTauri: true
        }, '*');
      } catch (error) {
        console.error('[AegisScan Extension] Erreur réponse:', error);
      }
    }
  });

  // ── Styles injectés ─────────────────────────
  const style = document.createElement("style");
  style.textContent = `
    /* Toast notification */
    #lg-toast {
      position: fixed;
      top: 18px;
      right: 18px;
      z-index: 2147483647;
      background: #1a7a4a;
      color: #fff;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 12px 18px 12px 14px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 6px 25px rgba(0,0,0,0.25);
      opacity: 0;
      transform: translateY(-12px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
      max-width: 350px;
      min-width: 200px;
    }
    #lg-toast.lg-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    #lg-toast .lg-icon { 
      font-size: 18px; 
      flex-shrink: 0;
    }
    
    /* Toast pour liens dangereux - plus visible */
    #lg-toast.lg-danger {
      background: #dc3545;
      animation: pulse-danger 2s infinite;
      border: 2px solid #fff;
    }
    
    /* Toast pour erreurs */
    #lg-toast.lg-warning {
      background: #f59e0b;
      border: 1px solid #fff;
    }
    
    /* Toast pour analyse en cours */
    #lg-toast.lg-analyzing {
      background: #6c757d;
      border: 1px solid #fff;
    }
    
    /* Animation pour les liens dangereux */
    @keyframes pulse-danger {
      0%, 100% { 
        box-shadow: 0 6px 25px rgba(220, 53, 69, 0.4);
        transform: translateY(0) scale(1);
      }
      50% { 
        box-shadow: 0 8px 30px rgba(220, 53, 69, 0.6);
        transform: translateY(-2px) scale(1.02);
      }
    }
    
    /* Animation pour l'analyse en cours */
    @keyframes analyzing {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    #lg-toast.lg-analyzing .lg-icon {
      animation: analyzing 1s infinite;
    }
  `;
  document.documentElement.appendChild(style);

  // ── Toast notification ────────────────────────
  const toast = document.createElement("div");
  toast.id = "lg-toast";
  toast.innerHTML = `<span class="lg-icon">✅</span><span id="lg-toast-msg">Lien analysé</span>`;
  document.documentElement.appendChild(toast);

  let toastTimer = null;
  
  function showToast(message, type = 'safe', duration = 3000) {
    const iconElement = toast.querySelector('.lg-icon');
    const msgElement = document.getElementById('lg-toast-msg');
    
    // Réinitialiser les classes
    toast.className = '';
    
    switch(type) {
      case 'safe':
        toast.classList.add('lg-safe');
        iconElement.textContent = '✅';
        break;
      case 'danger':
        toast.classList.add('lg-danger');
        iconElement.textContent = '🚨';
        break;
      case 'warning':
        toast.classList.add('lg-warning');
        iconElement.textContent = '⚠️';
        break;
      case 'analyzing':
        toast.classList.add('lg-analyzing');
        iconElement.textContent = '🔍';
        break;
    }
    
    msgElement.textContent = message;
    toast.classList.add('lg-visible');
    
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('lg-visible');
      // Nettoyer les classes après l'animation
      setTimeout(() => {
        toast.className = '';
      }, 300);
    }, duration);
  }

  // Fonction pour analyser une URL via l'API directement (fallback)
  async function analyzeUrlDirect(url) {
    try {
      console.log('[AegisScan Extension] Appel API direct pour:', url);
      
      const response = await fetch('http://localhost:3000/analyse-lien/process', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Pas de token - analyse anonyme
        },
        body: JSON.stringify({ 
          url,
          canal_source: 'Extension Chrome (Direct)'
        })
      });

      console.log('[AegisScan Extension] Réponse API:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[AegisScan Extension] Données reçues:', data);
        
        const isSafe = data.niveau_risque === 'sûr';
        const isBlocked = data.statut === 'bloqué';

        return {
          safe: isSafe && !isBlocked,
          url,
          niveau_risque: data.niveau_risque,
          score_risque: data.score_risque,
          verdict: data.analyse_verdict_final,
          statut: data.statut,
          cached: data.cached || false,
          raw: data,
        };
      } else if (response.status === 401) {
        return { safe: true, error: true, message: "Non connecté à AegisScan" };
      } else {
        return { safe: true, error: true, message: `Erreur API: ${response.status}` };
      }
    } catch (error) {
      console.error('[AegisScan Extension] Erreur API directe:', error);
      return { safe: true, error: true, message: "Erreur de connexion" };
    }
  }

  // ── Intercepteur de clics NON-BLOQUANT ────────────────────
  document.addEventListener("click", async (e) => {
    // Trouve le lien ancêtre le plus proche
    const anchor = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.tagName === "A" && el.href
    );
    if (!anchor) return;

    const url = anchor.href;

    // Ignorer les ancres locales, mailto, tel, javascript:
    if (
      !url ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("javascript:") ||
      url.startsWith("#") ||
      url === window.location.href ||
      (url.startsWith(window.location.origin) && url.includes("#"))
    ) {
      return;
    }

    // ✅ NE JAMAIS BLOQUER - Laisser la navigation se faire normalement
    console.log(`[AegisScan Extension] Analyse en arrière-plan: ${url}`);

    // Afficher une notification d'analyse
    showToast("Analyse en cours...", 'analyzing', 2500);

    // Analyser en arrière-plan APRÈS que la navigation ait commencé
    setTimeout(async () => {
      let result = null;
      
      try {
        // Méthode 1: Via l'extension (préférée)
        if (extensionReady && isChromeExtensionContext()) {
          console.log('[AegisScan Extension] Analyse via extension background');
          result = await chrome.runtime.sendMessage({ type: "ANALYZE_URL", url });
          console.log('[AegisScan Extension] Résultat reçu:', result);
        } else {
          // Méthode 2: Appel direct à l'API (fallback)
          console.log('[AegisScan Extension] Fallback vers API directe');
          result = await analyzeUrlDirect(url);
          console.log('[AegisScan Extension] Résultat direct:', result);
        }
        
        // Vérifier que nous avons un résultat
        if (!result) {
          console.warn('[AegisScan Extension] Aucun résultat reçu');
          showToast("Aucune réponse de l'analyse", 'warning', 4000);
          return;
        }
        
        console.log('[AegisScan Extension] Traitement du résultat:', result);
        
        if (result.safe === false) {
          // Lien dangereux détecté - notifier l'utilisateur
          console.log('[AegisScan Extension] Lien dangereux détecté');
          showToast(`⚠️ Lien dangereux détecté: ${url.substring(0, 30)}...`, 'danger', 8000);
          
          // Optionnel: Notification système si extension disponible
          try {
            if (extensionReady && isChromeExtensionContext()) {
              chrome.runtime.sendMessage({
                type: "SHOW_NOTIFICATION",
                title: "Lien dangereux détecté",
                message: `Le lien ${url} a été identifié comme dangereux par AegisScan.`
              });
            }
          } catch (notifError) {
            console.warn('[AegisScan Extension] Erreur notification:', notifError);
          }
        } else if (result.error) {
          // Erreur d'analyse
          console.log('[AegisScan Extension] Erreur d\'analyse:', result.message);
          showToast(`Erreur d'analyse: ${result.message}`, 'warning', 5000);
        } else if (result.safe === true) {
          // Lien sûr
          console.log('[AegisScan Extension] Lien sûr confirmé');
          const shortUrl = url.length > 30 ? url.substring(0, 30) + "..." : url;
          showToast(`✅ Lien sûr: ${shortUrl}`, 'safe', 4000);
        } else {
          // Cas non prévu - afficher le résultat brut
          console.log('[AegisScan Extension] Résultat inattendu:', result);
          showToast(`Analyse terminée (statut: ${result.niveau_risque || 'inconnu'})`, 'warning', 4000);
        }
        
      } catch (error) {
        console.error('[AegisScan Extension] Erreur analyse:', error);
        
        // Marquer l'extension comme déconnectée
        extensionReady = false;
        
        // Messages d'erreur plus spécifiques
        if (error.message && error.message.includes('Extension context invalidated')) {
          showToast("Extension rechargée - Actualisez la page", 'warning', 6000);
        } else if (error.message && error.message.includes('sendMessage')) {
          showToast("Extension déconnectée - Rechargez l'extension", 'warning', 6000);
        } else {
          showToast("Service d'analyse indisponible", 'warning', 4000);
        }
      }
    }, 100); // Petit délai pour laisser la navigation commencer

  }, true); // capture = true mais on ne bloque jamais

})();