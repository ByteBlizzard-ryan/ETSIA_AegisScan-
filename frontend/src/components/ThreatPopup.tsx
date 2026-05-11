import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, X, ExternalLink, Clock, Globe } from 'lucide-react';
import type { LinkAnalysisResult } from '../services/linkInterceptor';

interface ThreatPopupProps {
  isVisible: boolean;
  url: string;
  result: LinkAnalysisResult | null;
  onClose: () => void;
}

export default function ThreatPopup({ isVisible, url, result, onClose }: ThreatPopupProps) {
  const [isForceOpening, setIsForceOpening] = useState(false);

  if (!isVisible || !result) return null;

  const getRiskConfig = (niveau: string) => {
    switch (niveau) {
      case 'dangereux':
        return {
          icon: <AlertTriangle className="w-8 h-8" />,
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          title: 'Lien dangereux détecté !',
          description: 'Ce lien présente un risque élevé de phishing, malware ou autre menace.',
          recommendation: 'Nous recommandons fortement de ne pas visiter ce site.'
        };
      case 'suspect':
        return {
          icon: <Shield className="w-8 h-8" />,
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          title: 'Lien suspect détecté',
          description: 'Ce lien présente des caractéristiques suspectes qui nécessitent votre attention.',
          recommendation: 'Procédez avec prudence si vous décidez de continuer.'
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 h-8" />,
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          title: 'Analyse en cours',
          description: 'L\'analyse de ce lien est en cours de traitement.',
          recommendation: 'Veuillez patienter...'
        };
    }
  };

  const config = getRiskConfig(result.niveau_risque);

  const handleForceOpen = async () => {
    setIsForceOpening(true);
    try {
      // En mode web, on ouvre directement le lien
      window.open(url, '_blank');
      onClose();
    } catch (error) {
      console.error('Failed to force open link:', error);
    } finally {
      setIsForceOpening(false);
    }
  };

  const formatUrl = (url: string) => {
    if (url.length > 60) {
      return url.substring(0, 57) + '...';
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 ${config.borderColor} border-2`}>
        
        {/* Header avec icône de danger */}
        <div className={`${config.bgColor} px-6 py-4 rounded-t-2xl border-b ${config.borderColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${config.iconBg} ${config.iconColor}`}>
                {config.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{config.title}</h2>
                <p className="text-sm text-gray-600">AegisScan Protection</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-6 space-y-4">
          
          {/* URL concernée */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              URL interceptée
            </h3>
            <div className="bg-gray-100 p-3 rounded-lg border">
              <p className="font-mono text-sm text-blue-700 break-all" title={url}>
                {formatUrl(url)}
              </p>
            </div>
          </div>

          {/* Détails de l'analyse */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase">Niveau de risque</p>
              <p className={`font-bold capitalize ${
                result.niveau_risque === 'dangereux' ? 'text-red-600' :
                result.niveau_risque === 'suspect' ? 'text-orange-600' : 'text-gray-600'
              }`}>
                {result.niveau_risque}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase">Score de risque</p>
              <p className="font-bold text-gray-800">{result.score_risque}%</p>
            </div>
          </div>

          {/* Verdict */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Verdict de l'analyse</h3>
            <p className="text-sm text-gray-600 italic">"{result.analyse_verdict_final}"</p>
          </div>

          {/* Description et recommandation */}
          <div className={`p-4 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
            <p className="text-sm text-gray-700 mb-2">{config.description}</p>
            <p className="text-sm font-medium text-gray-800">{config.recommendation}</p>
          </div>

          {/* Informations supplémentaires */}
          {result.cached && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Résultat mis en cache (analyse récente)</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Rester en sécurité
          </button>
          <button
            onClick={handleForceOpen}
            disabled={isForceOpening}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              result.niveau_risque === 'dangereux' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isForceOpening ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Ouverture...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                Ouvrir quand même
              </>
            )}
          </button>
        </div>

        {/* Avertissement pour les liens dangereux */}
        {result.niveau_risque === 'dangereux' && (
          <div className="px-6 pb-4">
            <div className="bg-red-100 border border-red-300 rounded-lg p-3">
              <p className="text-xs text-red-800 font-medium">
                ⚠️ Attention : Ouvrir ce lien peut compromettre la sécurité de votre appareil et de vos données personnelles.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}