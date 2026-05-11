import React from 'react';
import { Shield, ShieldOff, Settings, Info } from 'lucide-react';

interface LinkInterceptionSettingsProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function LinkInterceptionSettings({ isEnabled, onToggle }: LinkInterceptionSettingsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${isEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
          {isEnabled ? (
            <Shield className="w-6 h-6 text-green-600" />
          ) : (
            <ShieldOff className="w-6 h-6 text-gray-500" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Protection automatique des liens</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => onToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            {isEnabled 
              ? "AegisScan analyse automatiquement tous les liens que vous cliquez avant de les ouvrir."
              : "La protection automatique est désactivée. Les liens s'ouvriront sans vérification."
            }
          </p>

          {/* Statut actuel */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            isEnabled 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            {isEnabled ? 'Protection active' : 'Protection désactivée'}
          </div>

          {/* Informations détaillées */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">Comment ça fonctionne :</p>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Liens sûrs</strong> : Notification discrète en haut à droite, ouverture immédiate</li>
                  <li>• <strong>Liens suspects/dangereux</strong> : Popup de blocage avec détails et option de forcer l'ouverture</li>
                  <li>• <strong>Historique</strong> : Toutes les analyses sont automatiquement enregistrées</li>
                  <li>• <strong>Performance</strong> : Cache intelligent pour éviter les analyses répétées</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}