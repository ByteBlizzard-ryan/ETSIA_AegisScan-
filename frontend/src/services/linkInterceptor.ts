// Service pour l'interception des liens - Version Web (sans Tauri)
// Note: Cette version fonctionne uniquement avec l'extension navigateur

import type { LinkAnalysisResult, LinkInterceptionEvent } from '../types/link';

class LinkInterceptorService {
  private isInitialized = false;
  private analysisCache = new Map<string, LinkAnalysisResult>();

  async initialize() {
    if (this.isInitialized) return;

    try {
      // En mode web, on ne peut pas intercepter au niveau système
      // L'interception se fait via l'extension navigateur
      console.log('[AegisScan Web] Service d\'interception initialisé (mode extension)');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize link interceptor:', error);
    }
  }

  // Cette méthode sera appelée par l'extension navigateur via postMessage
  async handleLinkInterception(event: LinkInterceptionEvent) {
    const { url, source } = event;
    
    try {
      // Analyse rapide du lien
      const result = await this.analyzeLink(url, source);
      
      // Émettre un événement pour l'interface utilisateur
      window.dispatchEvent(new CustomEvent('link-analyzed', {
        detail: result
      }));
      
      return result;
      
    } catch (error) {
      console.error('Error handling link interception:', error);
      return null;
    }
  }

  async analyzeLink(url: string, source: string): Promise<LinkAnalysisResult> {
    console.log('[LinkInterceptor] Début analyse:', url, 'Source:', source);
    
    // Vérifier le cache local d'abord
    const cacheKey = this.generateCacheKey(url);
    if (this.analysisCache.has(cacheKey)) {
      const cached = this.analysisCache.get(cacheKey)!;
      console.log('[LinkInterceptor] Résultat depuis le cache:', cached);
      return { ...cached, cached: true };
    }

    try {
      const token = localStorage.getItem('token');
      console.log('[LinkInterceptor] Token disponible:', !!token);
      
      if (!token) {
        console.error('[LinkInterceptor] Pas de token d\'authentification');
        throw new Error('No authentication token');
      }

      // Vérifier si le token est valide
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        if (payload.exp && payload.exp < currentTime) {
          console.error('[LinkInterceptor] Token expiré');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Token expired');
        }
        console.log('[LinkInterceptor] Token valide, expiration dans:', Math.round((payload.exp - currentTime) / 60), 'minutes');
      } catch (tokenError) {
        console.error('[LinkInterceptor] Erreur validation token:', tokenError);
        throw new Error('Invalid token');
      }

      console.log('[LinkInterceptor] Appel API backend...');
      const response = await fetch('http://localhost:3000/analyse-lien/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          url,
          canal_source: `Tauri-Interceptor (${source})`
        })
      });

      console.log('[LinkInterceptor] Réponse API:', response.status, response.statusText);

      if (!response.ok) {
        if (response.status === 401) {
          console.error('[LinkInterceptor] Erreur 401 - Token invalide ou expiré');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Authentication failed - please reconnect');
        }
        throw new Error(`Analysis failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[LinkInterceptor] Données reçues du backend:', result);
      
      // Mapper la réponse backend vers notre interface
      const analysisResult: LinkAnalysisResult = {
        url: result.lien?.url || url,
        niveau_risque: result.niveau_risque?.toLowerCase() || 'suspect',
        score_risque: result.score_risque || 0,
        analyse_verdict_final: result.analyse_verdict_final || 'Analyse incomplète',
        statut: result.statut || 'autorisé'
      };

      console.log('[LinkInterceptor] Résultat mappé:', analysisResult);

      // Mettre en cache pour 5 minutes
      this.analysisCache.set(cacheKey, analysisResult);
      setTimeout(() => this.analysisCache.delete(cacheKey), 5 * 60 * 1000);

      return analysisResult;
    } catch (error) {
      console.error('[LinkInterceptor] Erreur analyse lien:', error);
      
      // Messages d'erreur plus spécifiques
      let errorMessage = 'Erreur d\'analyse - Prudence recommandée';
      if (error instanceof Error) {
        if (error.message.includes('Authentication failed')) {
          errorMessage = 'Session expirée - Reconnectez-vous dans l\'application';
        } else if (error.message.includes('No authentication token')) {
          errorMessage = 'Non connecté - Connectez-vous dans l\'application';
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Erreur de connexion au serveur AegisScan';
        } else {
          errorMessage = `Erreur: ${error.message}`;
        }
      }
      
      // En cas d'erreur, considérer comme suspect par précaution
      return {
        url,
        niveau_risque: 'suspect',
        score_risque: 50,
        analyse_verdict_final: errorMessage,
        statut: 'autorisé'
      };
    }
  }

  private generateCacheKey(url: string): string {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '');
  }

  async disable() {
    if (!this.isInitialized) return;
    
    try {
      this.isInitialized = false;
      this.analysisCache.clear();
      console.log('Link interceptor disabled');
    } catch (error) {
      console.error('Failed to disable link interceptor:', error);
    }
  }

  // Méthodes pour compatibilité avec l'interface existante
  async enableInterception() {
    return this.initialize();
  }

  async disableInterception() {
    return this.disable();
  }

  getStatus() {
    return {
      isEnabled: this.isInitialized,
      mode: 'web-extension'
    };
  }
}

export const linkInterceptor = new LinkInterceptorService();