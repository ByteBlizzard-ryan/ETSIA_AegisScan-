import React from 'react';
import MainLayout from '../components/MainLayout';
import LinkInterceptionSettings from '../components/LinkInterceptionSettings';
import LinkInterceptionTest from '../components/LinkInterceptionTest';
import { useLinkInterception } from '../hooks/useLinkInterception';
import { Settings, Shield, Bell, User, Database, Info } from 'lucide-react';

export default function Parametres() {
  const { isInterceptionEnabled, enableInterception, disableInterception } = useLinkInterception();

  const handleToggleInterception = async (enabled: boolean) => {
    if (enabled) {
      await enableInterception();
    } else {
      await disableInterception();
    }
  };

  return (
    <MainLayout title="Paramètres" subtitle="Configurez votre protection AegisScan">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Protection automatique */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Protection automatique</h2>
          </div>
          
          <LinkInterceptionSettings
            isEnabled={isInterceptionEnabled}
            onToggle={handleToggleInterception}
          />

          {/* Composant de test en mode développement */}
          <LinkInterceptionTest />
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Notifications de liens sûrs</h3>
                  <p className="text-sm text-gray-600">Afficher une notification discrète pour les liens sécurisés</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Alertes de menaces</h3>
                  <p className="text-sm text-gray-600">Afficher des popups pour les liens dangereux ou suspects</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Sons d'alerte</h3>
                  <p className="text-sm text-gray-600">Jouer un son lors de la détection de menaces</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Compte utilisateur */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Compte utilisateur</h2>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Synchronisation des données</h3>
                  <p className="text-sm text-gray-600">Synchroniser l'historique et les paramètres entre appareils</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Analyses anonymes</h3>
                  <p className="text-sm text-gray-600">Contribuer aux données de sécurité de manière anonyme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Données et stockage */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Données et stockage</h2>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Durée de conservation</h3>
                  <p className="text-sm text-gray-600">Combien de temps conserver l'historique des analyses</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="30">30 jours</option>
                  <option value="90" selected>90 jours</option>
                  <option value="365">1 an</option>
                  <option value="0">Illimité</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Cache local</h3>
                  <p className="text-sm text-gray-600">Durée de mise en cache des résultats d'analyse</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="5">5 minutes</option>
                  <option value="30" selected>30 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="1440">24 heures</option>
                </select>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  Effacer toutes les données locales
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Cette action supprimera définitivement tout l'historique et les paramètres stockés localement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Informations système</h2>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Version de l'application :</span>
                <span className="ml-2 text-gray-600">1.0.0</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Dernière mise à jour :</span>
                <span className="ml-2 text-gray-600">Aujourd'hui</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Statut de la protection :</span>
                <span className={`ml-2 font-medium ${isInterceptionEnabled ? 'text-green-600' : 'text-red-600'}`}>
                  {isInterceptionEnabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Base de données :</span>
                <span className="ml-2 text-green-600 font-medium">Connectée</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium mr-3">
                Vérifier les mises à jour
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Diagnostics système
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}