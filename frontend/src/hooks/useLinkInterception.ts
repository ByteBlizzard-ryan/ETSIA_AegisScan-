import { useState, useEffect } from 'react';
import { linkInterceptor } from '../services/linkInterceptor';
import type { LinkAnalysisResult } from '../types/link';

interface ThreatPopupState {
  isVisible: boolean;
  url: string;
  result: LinkAnalysisResult | null;
}

export function useLinkInterception() {
  const [threatPopup, setThreatPopup] = useState<ThreatPopupState>({
    isVisible: false,
    url: '',
    result: null
  });

  const [isInterceptionEnabled, setIsInterceptionEnabled] = useState(false);

  useEffect(() => {
    // Initialiser l'intercepteur au montage du composant
    const initializeInterceptor = async () => {
      try {
        await linkInterceptor.initialize();
        setIsInterceptionEnabled(true);
      } catch (error) {
        console.error('Failed to initialize link interception:', error);
      }
    };

    // Écouter les événements de popup de menace
    const handleThreatPopup = (event: CustomEvent) => {
      const { url, result } = event.detail;
      setThreatPopup({
        isVisible: true,
        url,
        result
      });
    };

    // Écouter les événements d'analyse de lien (pour rafraîchir l'historique)
    const handleLinkAnalyzed = (event: CustomEvent) => {
      const result = event.detail;
      // Émettre un événement global pour que les composants intéressés puissent se mettre à jour
      window.dispatchEvent(new CustomEvent('history-updated', { detail: result }));
    };

    // Ajouter les listeners
    window.addEventListener('show-threat-popup', handleThreatPopup as EventListener);
    window.addEventListener('link-analyzed', handleLinkAnalyzed as EventListener);

    // Initialiser l'intercepteur
    initializeInterceptor();

    // Cleanup
    return () => {
      window.removeEventListener('show-threat-popup', handleThreatPopup as EventListener);
      window.removeEventListener('link-analyzed', handleLinkAnalyzed as EventListener);
      linkInterceptor.disable();
    };
  }, []);

  const closeThreatPopup = () => {
    setThreatPopup({
      isVisible: false,
      url: '',
      result: null
    });
  };

  const enableInterception = async () => {
    try {
      await linkInterceptor.enableInterception();
      setIsInterceptionEnabled(true);
    } catch (error) {
      console.error('Failed to enable link interception:', error);
    }
  };

  const disableInterception = async () => {
    try {
      await linkInterceptor.disableInterception();
      setIsInterceptionEnabled(false);
    } catch (error) {
      console.error('Failed to disable link interception:', error);
    }
  };

  return {
    threatPopup,
    closeThreatPopup,
    isInterceptionEnabled,
    enableInterception,
    disableInterception
  };
}