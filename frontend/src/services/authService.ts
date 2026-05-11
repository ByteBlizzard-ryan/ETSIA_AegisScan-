// Service d'authentification avec synchronisation automatique de l'extension
import { extensionSync } from './extensionSync';
import { getValidToken, clearAuthData, isTokenValid } from '../utils/auth';

class AuthService {
  private syncInterval: number | null = null;
  private isTauriMode: boolean = false;

  constructor() {
    // Détecter si on est en mode Tauri
    this.isTauriMode = window.location.protocol === 'tauri:' || 
                      window.location.hostname === 'tauri.localhost' || 
                      !!(window as any).__TAURI_INTERNALS__ || 
                      !!(window as any).__TAURI__;
    
    console.log('[AuthService] Mode détecté:', this.isTauriMode ? 'Tauri' : 'Web');
    
    // Démarrer la synchronisation automatique
    this.startAutoSync();
    
    // Synchroniser quand la page devient visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        console.log('[AuthService] Page visible, synchronisation...');
        setTimeout(() => {
          this.syncWithExtension();
        }, 1000);
      }
    });
    
    // Synchroniser au focus de la fenêtre
    window.addEventListener('focus', () => {
      console.log('[AuthService] Fenêtre en focus, synchronisation...');
      setTimeout(() => {
        this.syncWithExtension();
      }, 500);
    });
  }

  // Démarrer la synchronisation automatique
  private startAutoSync() {
    console.log('[AuthService] Démarrage de la synchronisation automatique...');
    
    // Synchroniser immédiatement
    setTimeout(() => {
      this.syncWithExtension();
    }, 2000); // Attendre 2 secondes pour que l'extension soit prête
    
    // Puis synchroniser toutes les 30 secondes
    this.syncInterval = window.setInterval(() => {
      const token = getValidToken();
      if (token) {
        console.log('[AuthService] Synchronisation automatique périodique...');
        this.syncWithExtension();
      }
    }, 30000);
  }

  // Arrêter la synchronisation automatique
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Synchroniser le token avec l'extension
  async syncWithExtension() {
    try {
      const token = getValidToken();
      console.log('[AuthService] Synchronisation - Token disponible:', !!token);
      
      if (token && extensionSync.getStatus().extensionAvailable) {
        console.log('[AuthService] Extension disponible, début synchronisation...');
        const success = await extensionSync.syncToken(token);
        if (success) {
          console.log('[AuthService] ✅ Token synchronisé avec l\'extension');
        } else {
          console.warn('[AuthService] ❌ Échec de synchronisation du token');
        }
        return success;
      } else if (!token) {
        // Pas de token valide, nettoyer l'extension
        console.log('[AuthService] Pas de token, nettoyage de l\'extension...');
        await extensionSync.clearToken();
        console.log('[AuthService] Token nettoyé de l\'extension');
        return true;
      } else {
        console.warn('[AuthService] Extension non disponible pour la synchronisation');
        return false;
      }
    } catch (error) {
      console.error('[AuthService] Erreur lors de la synchronisation:', error);
      return false;
    }
  }

  // Connexion avec synchronisation automatique
  async login(token: string, userData: any) {
    try {
      console.log('[AuthService] Début de la connexion...');
      
      // Stocker les données d'authentification
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('[AuthService] Données stockées, début synchronisation automatique...');
      
      // Synchroniser avec l'extension via Tauri
      if (this.isTauriMode) {
        try {
          const { invoke } = await import('@tauri-apps/api/core');
          await invoke('sync_extension_token', { token });
          console.log('[AuthService] ✅ Token synchronisé avec l\'extension via Tauri');
        } catch (error) {
          console.error('[AuthService] ❌ Erreur synchronisation Tauri:', error);
        }
      }
      
      // Synchronisation classique pour le mode web
      setTimeout(async () => {
        await this.syncWithExtension();
      }, 1000);
      
      console.log('[AuthService] Connexion réussie');
      return true;
    } catch (error) {
      console.error('[AuthService] Erreur lors de la connexion:', error);
      return false;
    }
  }

  // Déconnexion avec nettoyage de l'extension
  async logout() {
    try {
      // Nettoyer l'extension d'abord
      await extensionSync.clearToken();
      
      // Puis nettoyer les données locales
      clearAuthData();
      
      console.log('[AuthService] Déconnexion réussie et nettoyée');
      return true;
    } catch (error) {
      console.error('[AuthService] Erreur lors de la déconnexion:', error);
      return false;
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return isTokenValid(token);
  }

  // Obtenir le token valide
  getToken(): string | null {
    return getValidToken();
  }

  // Obtenir les données utilisateur
  getUser(): any | null {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Forcer une synchronisation manuelle
  async forceSyncWithExtension(): Promise<boolean> {
    try {
      console.log('[AuthService] Début synchronisation forcée...');
      
      // Forcer la détection de l'extension
      const detected = await extensionSync.forceDetection();
      console.log('[AuthService] Extension détectée:', detected);
      
      if (detected) {
        // Vérifier qu'on a un token valide
        const token = getValidToken();
        console.log('[AuthService] Token local disponible:', !!token);
        
        if (token) {
          // Synchroniser le token
          const syncSuccess = await extensionSync.syncToken(token);
          console.log('[AuthService] Synchronisation réussie:', syncSuccess);
          return syncSuccess;
        } else {
          console.warn('[AuthService] Pas de token valide à synchroniser');
          return false;
        }
      }
      
      console.warn('[AuthService] Extension non détectée');
      return false;
    } catch (error) {
      console.error('[AuthService] Erreur lors de la synchronisation forcée:', error);
      return false;
    }
  }
}

export const authService = new AuthService();