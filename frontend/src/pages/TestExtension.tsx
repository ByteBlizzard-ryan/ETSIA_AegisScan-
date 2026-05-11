import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { extensionSync } from '../services/extensionSync';
import { TestTube, ExternalLink, CheckCircle, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export default function TestExtension() {
  const [extensionStatus, setExtensionStatus] = useState({
    available: false,
    synced: false
  });
  const [testResults, setTestResults] = useState<Array<{
    url: string;
    timestamp: string;
    expected: string;
    actual: string;
    status: 'success' | 'error' | 'pending';
  }>>([]);

  const testLinks = [
    {
      url: 'https://www.google.com',
      expected: 'Toast verte "Lien sûr"',
      description: 'Lien sûr - Google',
      type: 'safe'
    },
    {
      url: 'https://github.com',
      expected: 'Toast verte "Lien sûr"',
      description: 'Lien sûr - GitHub',
      type: 'safe'
    },
    {
      url: 'https://malware-test-example.fake',
      expected: 'Popup de blocage',
      description: 'Lien de test dangereux',
      type: 'dangerous'
    },
    {
      url: 'https://suspicious-phishing-site.test',
      expected: 'Popup d\'avertissement',
      description: 'Lien de test suspect',
      type: 'suspicious'
    }
  ];

  useEffect(() => {
    checkExtensionStatus();
    const interval = setInterval(checkExtensionStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const checkExtensionStatus = () => {
    const status = extensionSync.getStatus();
    setExtensionStatus({
      available: status.extensionAvailable,
      synced: status.extensionAvailable
    });
    
    // Log du mode pour debug
    console.log(`[AegisScan Test] Mode: ${status.isTauriMode ? 'Tauri' : 'Web'}, Extension: ${status.extensionAvailable}`);
  };

  const handleTestLink = (testLink: typeof testLinks[0]) => {
    const newResult = {
      url: testLink.url,
      timestamp: new Date().toLocaleTimeString(),
      expected: testLink.expected,
      actual: 'Test en cours...',
      status: 'pending' as const
    };
    
    setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
    
    // Simuler un délai pour le test
    setTimeout(() => {
      setTestResults(prev => prev.map(result => 
        result.timestamp === newResult.timestamp
          ? { ...result, actual: 'Cliquez sur le lien pour tester', status: 'success' as const }
          : result
      ));
    }, 1000);
  };

  const syncToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const success = await extensionSync.syncToken(token);
      if (success) {
        alert('Token synchronisé avec succès !');
        checkExtensionStatus();
      } else {
        alert('Erreur lors de la synchronisation du token');
      }
    } else {
      alert('Aucun token trouvé. Connectez-vous d\'abord.');
    }
  };

  return (
    <MainLayout title="Test de l'extension" subtitle="Vérifiez le bon fonctionnement de l'extension navigateur AegisScan">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Statut de l'extension */}
        <div className={`p-4 rounded-xl border ${
          extensionStatus.available 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${
              extensionStatus.available ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <div className="flex-1">
              <h3 className={`font-semibold ${
                extensionStatus.available ? 'text-green-800' : 'text-red-800'
              }`}>
                {extensionStatus.available 
                  ? '✅ Extension détectée et synchronisée' 
                  : '❌ Extension non détectée'
                }
              </h3>
              <p className={`text-sm ${
                extensionStatus.available ? 'text-green-600' : 'text-red-600'
              }`}>
                {extensionStatus.available 
                  ? `L'extension AegisScan est installée et fonctionne correctement (Mode: ${extensionSync.getStatus().isTauriMode ? 'Tauri' : 'Web'})`
                  : 'Installez l\'extension navigateur pour activer la protection automatique'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={checkExtensionStatus}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Actualiser le statut"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {!extensionStatus.available && (
                <button
                  onClick={syncToken}
                  className="px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Synchroniser
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instructions d'installation */}
        {!extensionStatus.available && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Installation de l'extension</h3>
                <div className="text-sm text-blue-700 space-y-2">
                  <p><strong>Chrome :</strong> Allez sur <code>chrome://extensions</code> → Mode développeur → Charger l'extension non empaquetée → Sélectionnez le dossier <code>link-guard/</code></p>
                  <p><strong>Edge :</strong> Allez sur <code>edge://extensions</code> → Mode développeur → Charger l'extension décompressée → Sélectionnez le dossier <code>link-guard/</code></p>
                  <p><strong>Icônes :</strong> Si nécessaire, ouvrez <code>link-guard/create-simple-icons.html</code> pour générer les icônes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tests de liens */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <TestTube className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Tests de liens</h3>
              <p className="text-sm text-gray-600">Cliquez sur les liens ci-dessous pour tester l'interception</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {testLinks.map((testLink, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-colors ${
                  testLink.type === 'safe' 
                    ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                    : 'border-red-200 bg-red-50 hover:bg-red-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {testLink.type === 'safe' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">
                      {testLink.description}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      Attendu : {testLink.expected}
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={testLink.url}
                        onClick={() => handleTestLink(testLink)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                          extensionStatus.available
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                        {...(!extensionStatus.available && { 
                          onClick: (e) => e.preventDefault(),
                          title: 'Extension requise pour les tests'
                        })}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Tester ce lien
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 font-mono break-all">
                  {testLink.url}
                </div>
              </div>
            ))}
          </div>

          {/* Résultats des tests */}
          {testResults.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Résultats des tests</h4>
                <button
                  onClick={() => setTestResults([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Effacer
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border text-sm ${
                      result.status === 'success'
                        ? 'border-green-200 bg-green-50'
                        : result.status === 'error'
                        ? 'border-red-200 bg-red-50'
                        : 'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-gray-600 truncate">
                        {result.url}
                      </span>
                      <span className="text-xs text-gray-500">{result.timestamp}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <p><strong>Attendu :</strong> {result.expected}</p>
                      <p><strong>Résultat :</strong> {result.actual}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Guide de dépannage */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">🛠️ Guide de dépannage</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong>Extension non détectée :</strong>
              <ul className="ml-4 mt-1 space-y-1 list-disc">
                <li>Vérifiez que l'extension est installée et activée</li>
                <li>Rechargez cette page après installation</li>
                <li>Consultez les erreurs dans chrome://extensions</li>
              </ul>
            </div>
            <div>
              <strong>Pas de toast/popup lors des clics :</strong>
              <ul className="ml-4 mt-1 space-y-1 list-disc">
                <li>Assurez-vous d'être connecté à AegisScan</li>
                <li>Vérifiez que le backend fonctionne (localhost:3000)</li>
                <li>Consultez la console navigateur (F12) pour les erreurs</li>
              </ul>
            </div>
            <div>
              <strong>Token expiré :</strong>
              <ul className="ml-4 mt-1 space-y-1 list-disc">
                <li>Reconnectez-vous dans l'application</li>
                <li>Cliquez sur "Synchroniser" ci-dessus</li>
                <li>Rechargez la page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}