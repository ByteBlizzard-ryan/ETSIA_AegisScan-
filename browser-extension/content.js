// AegisScan Content Script - Interception des liens
console.log('AegisScan: Content script loaded');

class AegisScanLinkInterceptor {
  constructor() {
    this.isEnabled = true;
    this.cache = new Map();
    this.apiUrl = 'http://localhost:3000';
    this.init();
  }

  init() {
    // Intercepter tous les clics sur les liens
    document.addEventListener('click', this.handleLinkClick.bind(this), true);
    
    // Intercepter les liens dynamiques
    this.observeNewLinks();
    
    // Écouter les messages du background script
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    
    console.log('AegisScan: Link interceptor initialized');
  }

  handleLinkClick(event) {
    const link = event.target.closest('a');
    if (!link || !link.href) return;

    // Ignorer les liens internes et les ancres
    if (link.href.startsWith('#') || 
        link.href.startsWith('javascript:') ||
        link.href.startsWith('mailto:') ||
        link.href.startsWith('tel:')) {
      return;
    }

    // Empêcher l'ouverture immédiate
    event.preventDefault();
    event.stopPropagation();

    console.log('AegisScan: Link intercepted:', link.href);
    
    // Analyser le lien
    this.analyzeLinkAndDecide(link.href, link);
  }

  async analyzeLinkAndDecide(url, linkElement) {
    try {
      // Vérifier le cache local
      const cacheKey = btoa(url).replace(/[^a-zA-Z0-9]/g, '');
      if (this.cache.has(cacheKey)) {
        const cachedResult = this.cache.get(cacheKey);
        this.handleAnalysisResult(url, cachedResult, linkElement);
        return;
      }

      // Afficher un indicateur de chargement
      this.showLoadingIndicator(url);

      // Appeler l'API d'analyse
      const result = await this.callAnalysisAPI(url);
      
      // Mettre en cache (5 minutes)
      this.cache.set(cacheKey, result);
      setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);

      // Traiter le résultat
      this.handleAnalysisResult(url, result, linkElement);

    } catch (error) {
      console.error('AegisScan: Analysis failed:', error);
      // En cas d'erreur, considérer comme suspect
      this.handleAnalysisResult(url, {
        niveau_risque: 'suspect',
        score_risque: 50,
        analyse_verdict_final: 'Erreur d\'analyse - Prudence recommandée',
        statut: 'autorisé'
      }, linkElement);
    }
  }

  async callAnalysisAPI(url) {
    // Récupérer le token depuis le storage
    const token = await this.getStoredToken();
    
    const response = await fetch(`${this.apiUrl}/analyse-lien/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        url: url,
        canal_source: 'Browser Extension'
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      niveau_risque: data.niveau_risque?.toLowerCase() || 'suspect',
      score_risque: data.score_risque || 0,
      analyse_verdict_final: data.analyse_verdict_final || 'Analyse incomplète',
      statut: data.statut || 'autorisé'
    };
  }

  handleAnalysisResult(url, result, linkElement) {
    this.hideLoadingIndicator();

    if (result.niveau_risque === 'sûr') {
      // Lien sûr - notification et ouverture
      this.showSafeNotification(url);
      this.openLink(url, linkElement);
    } else {
      // Lien suspect/dangereux - popup de blocage
      this.showThreatPopup(url, result, linkElement);
    }
  }

  showLoadingIndicator(url) {
    const indicator = document.createElement('div');
    indicator.id = 'aegisscan-loading';
    indicator.innerHTML = `
      <div style="
        po