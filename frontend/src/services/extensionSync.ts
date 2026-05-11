// Service pour synchroniser le token avec l'extension navigateur
// Compatible avec les modes Web et Tauri
import { tauriExtensionBridge } from './tauriExtensionBridge';
import { initTauriNativeInterceptor } from './tauriNativeInterceptor';

class ExtensionSyncService {
  private extensionId: string | null = null;
  private isExtensionAvailable = false;
  private checkInterval: number | null = null;
  private isTauriMode = false;

  constructor() {
    // Détecter si on est en mode Tauri (Tauri 1 ou Tauri 2)
    this.isTauriMode = window.location.protocol === 'tauri:' || window.location.hostname === 'tauri.localhost' || !!(window as any).__TAURI_INTERNALS__ || !!(window as any).__TAURI__;
    console.log(`[AegisScan] Mode détecté: ${this.isTauriMode ? 'Tauri' : 'Web'}`);
    
    if (this.isTauriMode) {
      console.log(`[AegisScan] Initialisation de l'intercepteur natif Tauri (Simulation Extension)`);
      // setTimeout to ensure DOM is ready
      setTimeout(() => initTauriNativeInterceptor(), 100);
      this.isExtensionAvailable = true;
      return;
    }

    // Démarrer la détection immédiatement
    this.detectExtension();
    
    // Répéter la détection toutes les 5 secondes si pas trouvée
    const detectionInterval = setInterval(() => {
      if (!this.isExtensionAvailable) {
        console.log('[AegisScan] Nouvelle tentative de détection...');
        this.detectExtension();
      } else {
        clearInterval(detectionInterval);
      }
    }, 5000);
  }

  private async detectExtension() {
    // Écouter les réponses de l'extension AVANT d'envoyer des messages
    window.addEventListener('message', (event) => {
      if (event.data.source === 'aegisscan-extension') {
        if (event.data.type === 'AEGISSCAN_EXTENSION_RESPONSE' || event.data.type === 'AEGISSCAN_EXTENSION_READY') {
          this.isExtensionAvailable = true;
          console.log(`[AegisScan] Extension détectée via ${event.data.type} (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
          this.syncCurrentToken();
          
          if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
          }
        }
        
        // Écouter les confirmations de synchronisation
        if (event.data.type === 'AEGISSCAN_TOKEN_SYNC_SUCCESS') {
          console.log(`[AegisScan] ✅ Confirmation de synchronisation reçue (mode: ${event.data.appMode || 'unknown'})`);
        }
        
        if (event.data.type === 'AEGISSCAN_TOKEN_SYNC_FAILED') {
          console.error(`[AegisScan] ❌ Échec de synchronisation signalé par l'extension:`, event.data.error);
        }
      }
    });

    // Méthode 1: Vérifier si l'extension injecte un élément dans la page
    const checkForExtension = () => {
      // Vérifier si l'extension a injecté son script
      if ((window as any).__linkGuardActive) {
        this.isExtensionAvailable = true;
        console.log(`[AegisScan] Extension détectée via __linkGuardActive (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
        this.syncCurrentToken();
        return true;
      }

      // Méthode 2: Vérifier si l'extension a injecté des styles CSS
      const extensionStyles = document.querySelector('#lg-toast, #lg-overlay');
      if (extensionStyles) {
        this.isExtensionAvailable = true;
        console.log(`[AegisScan] Extension détectée via éléments DOM (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
        this.syncCurrentToken();
        return true;
      }

      // Méthode 3: Tenter de communiquer avec l'extension
      try {
        console.log(`[AegisScan] Envoi message de vérification à l'extension (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
        window.postMessage({
          type: 'AEGISSCAN_EXTENSION_CHECK',
          source: 'aegisscan-web',
          mode: this.isTauriMode ? 'tauri' : 'web',
          origin: window.location.origin
        }, '*');
      } catch (error) {
        console.error('[AegisScan] Erreur envoi message:', error);
      }

      return false;
    };

    // Attendre que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.performDetection(checkForExtension), 500);
      });
    } else {
      setTimeout(() => this.performDetection(checkForExtension), 500);
    }
  }

  private performDetection(checkForExtension: () => boolean) {
    // Vérification immédiate
    if (checkForExtension()) {
      return;
    }

    // Pour React et Tauri, on a besoin de vérifications plus fréquentes et plus longues
    let attempts = 0;
    const intervals = this.isTauriMode 
      ? [500, 1000, 1500, 2000, 3000, 5000, 8000, 10000] // Plus d'attente pour Tauri
      : [500, 1000, 1500, 2000, 3000, 5000, 8000]; // Intervalles normaux pour Web
    
    const scheduleNextCheck = () => {
      if (attempts >= intervals.length) {
        console.log(`[AegisScan] Extension non détectée après toutes les tentatives (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
        return;
      }
      
      setTimeout(() => {
        attempts++;
        console.log(`[AegisScan] Tentative de détection ${attempts}/${intervals.length} (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
        
        if (!checkForExtension()) {
          scheduleNextCheck();
        }
      }, intervals[attempts]);
    };

    scheduleNextCheck();
  }

  async syncToken(token: string): Promise<boolean> {
    if (!this.isExtensionAvailable) {
      console.warn(`[AegisScan] Extension non disponible pour la synchronisation (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
      return false;
    }

    try {
      // Créer une promesse qui attend la confirmation de l'extension
      const syncPromise = new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('[AegisScan] ⏱️ TIMEOUT - Pas de confirmation de synchronisation reçue après 5 secondes');
          console.warn('[AegisScan] Cela peut indiquer que l\'extension ne répond pas ou n\'est pas correctement chargée');
          resolve(false);
        }, 5000); // 5 secondes de timeout

        const messageHandler = (event: MessageEvent) => {
          console.log('[AegisScan] Message reçu pendant la synchronisation:', event.data);
          
          if (event.data.source === 'aegisscan-extension') {
            if (event.data.type === 'AEGISSCAN_TOKEN_SYNC_SUCCESS') {
              clearTimeout(timeout);
              window.removeEventListener('message', messageHandler);
              console.log('[AegisScan] ✅ Synchronisation confirmée par l\'extension');
              resolve(true);
            } else if (event.data.type === 'AEGISSCAN_TOKEN_SYNC_FAILED') {
              clearTimeout(timeout);
              window.removeEventListener('message', messageHandler);
              console.error('[AegisScan] ❌ Synchronisation échouée par l\'extension:', event.data.error);
              resolve(false);
            }
          }
        };

        window.addEventListener('message', messageHandler);
        console.log('[AegisScan] 👂 Écoute des messages de confirmation activée');
      });

      // Envoyer le token à l'extension via postMessage
      console.log('[AegisScan] 📤 Envoi du token à l\'extension...');
      console.log('[AegisScan] Token à envoyer (longueur):', token.length);
      console.log('[AegisScan] Mode:', this.isTauriMode ? 'tauri' : 'web');
      console.log('[AegisScan] Origin:', window.location.origin);
      
      window.postMessage({
        type: 'AEGISSCAN_TOKEN_SYNC',
        token: token,
        source: 'aegisscan-web',
        mode: this.isTauriMode ? 'tauri' : 'web',
        origin: window.location.origin
      }, '*');

      console.log(`[AegisScan] 📨 Message envoyé, attente de confirmation...`);
      
      // Attendre la confirmation
      return await syncPromise;
      
    } catch (error) {
      console.error('[AegisScan] Erreur synchronisation token:', error);
      return false;
    }
  }

  async syncCurrentToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return await this.syncToken(token);
    }
    return false;
  }

  async clearToken(): Promise<boolean> {
    if (!this.isExtensionAvailable) {
      return false;
    }

    try {
      window.postMessage({
        type: 'AEGISSCAN_TOKEN_CLEAR',
        source: 'aegisscan-web',
        mode: this.isTauriMode ? 'tauri' : 'web',
        origin: window.location.origin
      }, '*');

      console.log(`[AegisScan] Demande de suppression de token envoyée à l'extension (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
      return true;
    } catch (error) {
      console.error('[AegisScan] Erreur suppression token:', error);
      return false;
    }
  }

  getStatus() {
    return {
      extensionAvailable: this.isExtensionAvailable,
      extensionId: this.extensionId,
      mode: this.isTauriMode ? 'tauri' : 'web',
      isTauriMode: this.isTauriMode
    };
  }

  // Méthode pour réinitialiser complètement la détection
  resetDetection() {
    console.log(`[AegisScan] Réinitialisation complète de la détection (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
    this.isExtensionAvailable = false;
    
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    
    // Redémarrer la détection
    setTimeout(() => this.detectExtension(), 100);
  }

  // Méthode pour forcer une nouvelle détection
  forceDetection() {
    console.log(`[AegisScan] Forçage de la détection d'extension (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
    
    if (this.isTauriMode) {
      this.isExtensionAvailable = true;
      this.syncCurrentToken();
      return Promise.resolve(true);
    }
    
    this.isExtensionAvailable = false;
    
    // Vérification immédiate des éléments DOM
    if ((window as any).__linkGuardActive) {
      this.isExtensionAvailable = true;
      console.log('[AegisScan] Extension détectée immédiatement via __linkGuardActive');
      this.syncCurrentToken();
      return Promise.resolve(true);
    }

    const extensionElements = document.querySelector('#lg-toast, #lg-overlay');
    if (extensionElements) {
      this.isExtensionAvailable = true;
      console.log('[AegisScan] Extension détectée immédiatement via éléments DOM');
      this.syncCurrentToken();
      return Promise.resolve(true);
    }

    // Envoyer un message de test
    console.log('[AegisScan] Envoi message de test pour forcer la détection');
    window.postMessage({
      type: 'AEGISSCAN_EXTENSION_CHECK',
      source: 'aegisscan-web',
      mode: this.isTauriMode ? 'tauri' : 'web',
      origin: window.location.origin,
      timestamp: Date.now()
    }, '*');

    // Attendre une réponse pendant 5 secondes (plus long pour Tauri)
    const timeout = this.isTauriMode ? 5000 : 3000;
    return new Promise<boolean>((resolve) => {
      const timeoutId = setTimeout(() => {
        console.log(`[AegisScan] Timeout - extension non détectée (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
        resolve(false);
      }, timeout);

      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'AEGISSCAN_EXTENSION_RESPONSE' && event.data.source === 'aegisscan-extension') {
          clearTimeout(timeoutId);
          window.removeEventListener('message', messageHandler);
          this.isExtensionAvailable = true;
          console.log(`[AegisScan] Extension détectée via réponse forcée (mode: ${this.isTauriMode ? 'Tauri' : 'Web'})`);
          this.syncCurrentToken();
          resolve(true);
        }
      };

      window.addEventListener('message', messageHandler);
    });
  }
}

export const extensionSync = new ExtensionSyncService();