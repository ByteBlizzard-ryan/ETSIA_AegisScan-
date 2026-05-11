// Service pont entre Tauri et l'extension navigateur
import { invoke } from '@tauri-apps/api/core';

class TauriExtensionBridge {
  private isTauriMode = false;

  constructor() {
    this.isTauriMode = window.location.protocol === 'tauri:' || window.location.hostname === 'tauri.localhost' || !!(window as any).__TAURI_INTERNALS__ || !!(window as any).__TAURI__;
  }

  async syncTokenWithExtension(token: string): Promise<boolean> {
    if (!this.isTauriMode) {
      return false;
    }

    try {
      // Utiliser la commande Tauri pour synchroniser le token
      await invoke('sync_extension_token', { token });
      
      // Également utiliser la méthode postMessage standard
      window.postMessage({
        type: 'AEGISSCAN_TOKEN_SYNC',
        token: token,
        source: 'aegisscan-web',
        mode: 'tauri',
        origin: window.location.origin
      }, '*');

      console.log('[Tauri Bridge] Token synchronisé avec l\'extension');
      return true;
    } catch (error) {
      console.error('[Tauri Bridge] Erreur synchronisation token:', error);
      return false;
    }
  }

  async getAppInfo() {
    if (!this.isTauriMode) {
      return null;
    }

    try {
      const info = await invoke('get_app_info');
      return JSON.parse(info as string);
    } catch (error) {
      console.error('[Tauri Bridge] Erreur récupération info app:', error);
      return null;
    }
  }

  isTauri(): boolean {
    return this.isTauriMode;
  }

  // Méthode pour annoncer la présence de l'app Tauri à l'extension
  announceToExtension() {
    if (!this.isTauriMode) return;

    // Envoyer un message spécial pour Tauri
    window.postMessage({
      type: 'AEGISSCAN_TAURI_READY',
      source: 'aegisscan-web',
      mode: 'tauri',
      origin: window.location.origin,
      timestamp: Date.now()
    }, '*');

    console.log('[Tauri Bridge] Annonce de présence Tauri envoyée');
  }
}

export const tauriExtensionBridge = new TauriExtensionBridge();