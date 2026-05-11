// ─────────────────────────────────────────────
//  LinkGuard — Content Script NON-BLOQUANT
//  Analyse les liens APRÈS navigation, sans jamais bloquer
// ─────────────────────────────────────────────

(function () {
  // Éviter double injection
  if (window.__linkGuardActive) return;
  window.__linkGuardActive = true;

  console.log('[AegisScan Extension] Content script NON-BLOQUANT chargé');

  // Annoncer la présence de l'extension
  setTimeout(() => {
    window.postMessage({
      type: 'AEGISSCAN_EXTENSION_READY',
      source: 'aegisscan-extension',
      timestamp: Date.now()
    }, '*');
    console.log('[AegisScan Extension] Signal de présence envoyé');
  }, 100);

  // Écouter les messages de synchronisation depuis l'application web
  window.addEventListener('message', async (event) => {
    if (event.data.source !== 'aegisscan-web') return;
    
    console.log('[AegisScan Extension] Message reçu:', event.data.type);
    
    if (event.data.type === 'AEGISSCAN_TOKEN_SYNC') {
      try {
        await chrome.runtime.sendMessage({
          type: 'SET_TOKEN',
          token: event.data.token
        });
        console.log('[AegisScan Extension] Token synchronisé depuis l\'application web');
      } catch (error) {
        console.error('[AegisScan Extension] Erreur sync token:', error);
      }
    }
    
    if (event.data.type === 'AEGISSCAN_TOKEN_CLEAR') {
      try {
        await chrome.runtime.sendMessage({
          type: 'SET_TOKEN',
          token: null
        });
        console.log('[AegisScan Extension] Token supprimé');
      } catch (error) {
        console.error('[AegisScan Extension] Erreur suppression token:', error);
      }
    }

    // Répondre aux vérifications de présence de l'extension
    if (event.data.type === 'AEGISSCAN_EXTENSION_CHECK') {
      try {
        console.log('[AegisScan Extension] Réponse à la vérification de présence');
        window.postMessage({
          type: 'AEGISSCAN_EXTENSION_RESPONSE',
          source: 'aegisscan-extension',
          available: true,
          timestamp: Date.now(),
          version: '1.0.0'
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
      font-size: 13px;
      font-weight: 500;
      padding: 10px 16px 10px 12px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      opacity: 0;
      transform: translateY(-8px);
      transition: opacity 0.22s ease, transform 0.22s ease;
      pointer-events: none;
      max-width: 300px;
    }
    #lg-toast.lg-visible {
      opacity: 1;
      transform: translateY(0);
    }
    #lg-toast .lg-icon { font-size: 16px; }
    
    /* Toast pour liens dangereux */
    #lg-toast.lg-danger {
      background: #dc3545;
    }
    
    /* Toast pour erreurs */
    #lg-toast.lg-warning {
      background: #f59e0b;
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
    toast.className = 'lg-visible';
    
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
        toast.classList.add('lg-warning');
        iconElement.textContent = '🔍';
        break;
    }
    
    msgElement.textContent = message;
    toast.classList.add('lg-visible');
    
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('lg-visible');
    }, duration);
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
    showToast("Analyse en cours...", 'analyzing', 1500);

    // Analyser en arrière-plan APRÈS que la navigation ait commencé
    setTimeout(async () => {
      try {
        const result = await chrome.runtime.sendMessage({ type: "ANALYZE_URL", url });
        
        if (result && result.safe === false) {
          // Lien dangereux détecté - notifier l'utilisateur
          showToast(`⚠️ Lien dangereux détecté: ${url.substring(0, 30)}...`, 'danger', 5000);
          
          // Optionnel: Envoyer une notification système
          if (chrome.notifications) {
            chrome.runtime.sendMessage({
              type: "SHOW_NOTIFICATION",
              title: "Lien dangereux détecté",
              message: `Le lien ${url} a été identifié comme dangereux par AegisScan.`
            });
          }
        } else if (result && result.error) {
          // Erreur d'analyse
          showToast(`Erreur d'analyse: ${result.message}`, 'warning', 3000);
        } else {
          // Lien sûr
          const shortUrl = url.length > 30 ? url.substring(0, 30) + "..." : url;
          showToast(`✅ Lien sûr: ${shortUrl}`, 'safe', 2000);
        }
        
      } catch (error) {
        console.error('[AegisScan Extension] Erreur analyse:', error);
        showToast("Extension déconnectée", 'warning', 2000);
      }
    }, 100); // Petit délai pour laisser la navigation commencer

  }, true); // capture = true mais on ne bloque jamais

})();