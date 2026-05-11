import { linkInterceptor } from './linkInterceptor';

let isInitialized = false;

export function initTauriNativeInterceptor() {
  if (isInitialized) return;
  isInitialized = true;
  
  // Signaler à l'application que "l'extension" (native) est prête
  (window as any).__linkGuardActive = true;
  
  console.log('[AegisScan Tauri] Intercepteur natif initialisé');

  // ── Styles injectés (identiques à content.js) ─────────────────────────
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
      pointer-events: none;
    }
    #lg-overlay.lg-visible { 
      opacity: 1; 
      pointer-events: auto;
    }

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

  let toastTimer: any = null;
  function showSafeToast(url: string, result: any) {
    const short = url.length > 50 ? url.slice(0, 47) + "…" : url;
    const cacheText = result.cached ? " (cache)" : "";
    document.getElementById("lg-toast-msg")!.textContent = "Lien sûr — " + short + cacheText;
    toast.classList.add("lg-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("lg-visible"), 5000);
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

  let pendingUrl: string | null = null;
  let pendingTarget = "_self";

  document.getElementById("lg-btn-cancel")!.addEventListener("click", () => {
    overlay.classList.remove("lg-visible");
    pendingUrl = null;
  });

  document.getElementById("lg-btn-open")!.addEventListener("click", () => {
    overlay.classList.remove("lg-visible");
    if (pendingUrl) {
      window.open(pendingUrl, pendingTarget);
      pendingUrl = null;
    }
  });

  function showDangerOverlay(url: string, result: any, target?: string) {
    pendingUrl = url;
    pendingTarget = target || "_self";
    document.getElementById("lg-url-box")!.textContent = url;
    
    // Formater les détails de l'analyse AegisScan
    let analysisDetails = "";
    if (result.niveau_risque) analysisDetails += "Niveau de risque: " + result.niveau_risque + "\n";
    if (result.score_risque !== undefined) analysisDetails += "Score de risque: " + result.score_risque + "%\n";
    if (result.analyse_verdict_final) analysisDetails += "Verdict: " + result.analyse_verdict_final + "\n";
    if (result.statut) analysisDetails += "Statut: " + result.statut + "\n";
    if (result.cached) analysisDetails += "Source: Cache (analyse récente)\n";
    
    document.getElementById("lg-raw-box")!.textContent = analysisDetails || "Aucun détail disponible";
    overlay.classList.add("lg-visible");
  }

  // ── Intercepteur de clics natif Tauri ────────
  document.addEventListener("click", async (e: MouseEvent) => {
    // Trouve le lien ancêtre le plus proche
    const anchor = e.composedPath().find(
      (el) => el instanceof HTMLElement && el.tagName === "A" && (el as HTMLAnchorElement).href
    ) as HTMLAnchorElement;

    if (!anchor) return;

    const url = anchor.href;
    const target = anchor.target || "_self";

    // Ignorer les ancres locales, mailto, tel, javascript: etc.
    if (
      !url ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("javascript:") ||
      url.startsWith("#") ||
      url.startsWith("tauri://") || // Ne pas intercepter les liens propres à l'app Tauri
      url === window.location.href ||
      url.startsWith(window.location.origin)
    ) {
      return;
    }

    // On veut bloquer seulement les liens HTTP/HTTPS externes
    if (!url.startsWith('http')) return;

    console.log("[AegisScan Tauri] Interception native du lien: " + url);

    // Afficher indicateur de chargement
    document.getElementById("lg-toast-msg")!.textContent = "Analyse en cours…";
    toast.style.background = "#4b5563";
    toast.classList.add("lg-visible");
    clearTimeout(toastTimer);

    // Bloquer la navigation immédiatement pour analyser
    e.preventDefault();
    e.stopImmediatePropagation();

    try {
      // Utiliser l'instance de service existante
      const result: any = await (linkInterceptor as any).analyzeLink(url, 'Tauri OS App');

      // Déclencher l'événement pour mettre à jour l'historique
      window.dispatchEvent(new CustomEvent('link-analyzed', { detail: result }));

      // Restaurer la couleur
      toast.style.background = "";

      // 'bloqué' correspond aux liens dangereux d'après le backend
      if (result && result.statut === 'bloqué') {
        toast.classList.remove("lg-visible");
        showDangerOverlay(url, result, target);
      } else {
        showSafeToast(url, result);
        // Si sûr, on déclenche l'ouverture!
        // Mais attendre un court instant pour laisser voir le toast
        setTimeout(() => {
          if (target === '_blank') {
            window.open(url, '_blank');
          } else {
            window.location.href = url;
          }
        }, 5000);
      }
    } catch (err: any) {
      console.warn("[AegisScan Tauri] Erreur analyse:", err);
      document.getElementById("lg-toast-msg")!.textContent = "Erreur d'analyse";
      toast.style.background = "#f59e0b";
      toast.classList.add("lg-visible");
      
      setTimeout(() => {
        toast.classList.remove("lg-visible");
        toast.style.background = "";
        // En cas d'erreur de réseau, on laisse quand même naviguer
        if (target === '_blank') window.open(url, '_blank');
        else window.location.href = url;
      }, 1000);
    }
  }, true);
}
