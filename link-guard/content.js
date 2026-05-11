// ─────────────────────────────────────────────
//  LinkGuard — Content Script
//  Intercepte chaque clic sur un lien,
//  attend le résultat de l'analyse,
//  affiche une toast ou une popup de blocage.
// ─────────────────────────────────────────────

(function () {
  // Éviter double injection
  if (window.__linkGuardActive) return;
  window.__linkGuardActive = true;

  console.log('[AegisScan Extension] Content script chargé et actif');

  // Annoncer la présence de l'extension après un court délai
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
    /* Toast "Lien sûr" */
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

    /* Overlay de blocage */
    #lg-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483646;
      background: rgba(10, 10, 10, 0.72);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, sans-serif;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    #lg-overlay.lg-visible { opacity: 1; }

    #lg-card {
      background: #fff;
      border-radius: 16px;
      padding: 28px 28px 22px;
      width: min(480px, 92vw);
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      transform: translateY(12px);
      transition: transform 0.2s ease;
    }
    #lg-overlay.lg-visible #lg-card { transform: translateY(0); }

    @media (prefers-color-scheme: dark) {
      #lg-card { background: #1c1c1e; color: #f0f0f0; }
      #lg-url-box { background: #2c2c2e !important; color: #aaa !important; }
      #lg-raw-box { background: #2c2c2e !important; color: #aaa !important; }
    }

    #lg-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    #lg-badge {
      background: #fee2e2;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    #lg-title { font-size: 17px; font-weight: 700; color: #b91c1c; margin: 0; }
    #lg-subtitle { font-size: 13px; color: #888; margin: 2px 0 0; }

    #lg-url-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #aaa;
      margin: 0 0 5px;
    }
    #lg-url-box {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      color: #555;
      word-break: break-all;
      margin-bottom: 14px;
      max-height: 60px;
      overflow: auto;
    }
    #lg-raw-box {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 11px;
      color: #666;
      font-family: monospace;
      word-break: break-all;
      margin-bottom: 18px;
      max-height: 80px;
      overflow: auto;
    }
    #lg-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .lg-btn {
      padding: 9px 18px;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .lg-btn:hover { opacity: 0.85; }
    .lg-btn-cancel {
      background: #f0f0f0;
      color: #333;
    }
    .lg-btn-open {
      background: #b91c1c;
      color: #fff;
    }
    @media (prefers-color-scheme: dark) {
      .lg-btn-cancel { background: #3a3a3c; color: #eee; }
    }
  `;
  document.documentElement.appendChild(style);

  // ── Toast "Lien sûr" ────────────────────────
  const toast = document.createElement("div");
  toast.id = "lg-toast";
  toast.innerHTML = `<span class="lg-icon">✅</span><span id="lg-toast-msg">Lien sûr</span>`;
  document.documentElement.appendChild(toast);

  let toastTimer = null;
  function showSafeToast(url, result) {
    const short = url.length > 50 ? url.slice(0, 47) + "…" : url;
    const cacheText = result.cached ? " (cache)" : "";
    document.getElementById("lg-toast-msg").textContent = `Lien sûr — ${short}${cacheText}`;
    toast.classList.add("lg-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("lg-visible"), 3200);
  }

  // ── Overlay "Lien dangereux" ─────────────────
  const overlay = document.createElement("div");
  overlay.id = "lg-overlay";
  overlay.innerHTML = `
    <div id="lg-card">
      <div id="lg-header">
        <div id="lg-badge">🚨</div>
        <div>
          <p id="lg-title">Lien dangereux détecté</p>
          <p id="lg-subtitle">AegisScan a identifié ce lien comme potentiellement malveillant.</p>
        </div>
      </div>
      <p id="lg-url-label">URL cible</p>
      <div id="lg-url-box"></div>
      <p id="lg-url-label">Détails de l'analyse</p>
      <div id="lg-raw-box"></div>
      <div id="lg-actions">
        <button class="lg-btn lg-btn-cancel" id="lg-btn-cancel">🛡️ Rester en sécurité</button>
        <button class="lg-btn lg-btn-open" id="lg-btn-open">Ouvrir quand même</button>
      </div>
    </div>
  `;
  document.documentElement.appendChild(overlay);

  let pendingUrl = null;
  let pendingTarget = "_self";

  document.getElementById("lg-btn-cancel").addEventListener("click", () => {
    overlay.classList.remove("lg-visible");
    pendingUrl = null;
  });

  document.getElementById("lg-btn-open").addEventListener("click", () => {
    overlay.classList.remove("lg-visible");
    if (pendingUrl) {
      window.open(pendingUrl, pendingTarget);
      pendingUrl = null;
    }
  });

  function showDangerOverlay(url, result, target) {
    pendingUrl = url;
    pendingTarget = target || "_self";
    document.getElementById("lg-url-box").textContent = url;
    
    // Formater les détails de l'analyse AegisScan
    let analysisDetails = "";
    if (result.niveau_risque) {
      analysisDetails += `Niveau de risque: ${result.niveau_risque}\n`;
    }
    if (result.score_risque !== undefined) {
      analysisDetails += `Score de risque: ${result.score_risque}%\n`;
    }
    if (result.verdict) {
      analysisDetails += `Verdict: ${result.verdict}\n`;
    }
    if (result.statut) {
      analysisDetails += `Statut: ${result.statut}\n`;
    }
    if (result.cached) {
      analysisDetails += `Source: Cache (analyse récente)\n`;
    }
    
    document.getElementById("lg-raw-box").textContent = analysisDetails || "Aucun détail disponible";
    overlay.classList.add("lg-visible");
  }

  // ── Intercepteur de clics ────────────────────
  document.addEventListener("click", async (e) => {
    // Trouve le lien ancêtre le plus proche
    const anchor = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.tagName === "A" && el.href
    );
    if (!anchor) return;

    const url = anchor.href;
    const target = anchor.target || "_self";

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

    // ⚠️ NE PAS BLOQUER immédiatement - analyser en arrière-plan d'abord
    console.log(`[AegisScan Extension] Analyse du lien: ${url}`);

    // Afficher un petit indicateur de chargement dans la toast
    document.getElementById("lg-toast-msg").textContent = "Analyse en cours…";
    toast.style.background = "#4b5563";
    toast.classList.add("lg-visible");
    clearTimeout(toastTimer);

    // Appeler le background pour analyse
    let result;
    try {
      result = await chrome.runtime.sendMessage({ type: "ANALYZE_URL", url });
    } catch (err) {
      // Extension déchargée ou erreur → laisser naviguer normalement
      console.warn("[AegisScan Extension] Erreur analyse:", err);
      toast.classList.remove("lg-visible");
      return; // Laisser le clic se propager normalement
    }

    // Réinitialiser la couleur de la toast
    toast.style.background = "";

    if (result && result.safe === false) {
      // 🚨 Lien dangereux - MAINTENANT on bloque
      e.preventDefault();
      e.stopImmediatePropagation();
      toast.classList.remove("lg-visible");
      showDangerOverlay(url, result, target);
    } else if (result && result.error) {
      // ⚠️ Erreur d'analyse - afficher un avertissement mais laisser passer
      document.getElementById("lg-toast-msg").textContent = `Erreur d'analyse - ${result.message || 'Connexion impossible'}`;
      toast.style.background = "#f59e0b";
      toast.classList.add("lg-visible");
      setTimeout(() => {
        toast.classList.remove("lg-visible");
        toast.style.background = "";
      }, 2000);
      // Ne pas bloquer la navigation en cas d'erreur
    } else {
      // ✅ Lien sûr - afficher la toast et laisser naviguer
      showSafeToast(url, result);
      // La navigation continue normalement
    }
  }, true); // capture = true pour intercepter avant tout autre handler

})();
