import React, { useState } from 'react';
import { TestTube, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

export default function LinkInterceptionTest() {
  const [testResults, setTestResults] = useState<Array<{
    url: string;
    timestamp: string;
    status: 'success' | 'error';
    message: string;
  }>>([]);

  const testUrls = [
    { url: 'https://www.google.com', type: 'safe', label: 'Lien sûr (Google)' },
    { url: 'https://malware-test.example.com', type: 'dangerous', label: 'Lien dangereux (Test)' },
    { url: 'https://suspicious-site.test', type: 'suspicious', label: 'Lien suspect (Test)' },
    { url: 'https://phishing-example.fake', type: 'phishing', label: 'Phishing (Test)' }
  ];

  const handleTestLink = async (url: string) => {
    try {
      // En mode web, on simule juste le test
      const newResult = {
        url,
        timestamp: new Date().toLocaleTimeString(),
        status: 'success' as const,
        message: 'Test simulé - Cliquez sur le lien pour tester réellement'
      };
      
      setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
    } catch (error) {
      const newResult = {
        url,
        timestamp: new Date().toLocaleTimeString(),
        status: 'error' as const,
        message: `Erreur: ${error}`
      };
      
      setTestResults(prev => [newResult, ...prev.slice(0, 9)]);
    }
  };

  const handleCustomTest = (customUrl: string) => {
    if (customUrl.trim()) {
      handleTestLink(customUrl.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <TestTube className="w-6 h-6 text-purple-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Test d'interception de liens</h3>
          <p className="text-sm text-gray-600">Testez le système d'interception avec des liens d'exemple</p>
        </div>
      </div>

      {/* Information importante */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-blue-900">Mode Web - Extension requise</h4>
            <p className="text-sm text-blue-700">L'interception fonctionne uniquement avec l'extension navigateur installée</p>
          </div>
        </div>
      </div>

      {/* Liens de test prédéfinis */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-800">Liens de test prédéfinis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testUrls.map((testCase, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border text-left transition-colors ${
                testCase.type === 'safe' 
                  ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                  : testCase.type === 'dangerous'
                  ? 'border-red-200 bg-red-50 hover:bg-red-100'
                  : 'border-orange-200 bg-orange-50 hover:bg-orange-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {testCase.type === 'safe' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
                <span className="font-medium text-sm">{testCase.label}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 font-mono">{testCase.url}</p>
              <div className="mt-2">
                <a
                  href={testCase.url}
                  onClick={() => handleTestLink(testCase.url)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Tester ce lien
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test personnalisé */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-800">Test personnalisé</h4>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://example.com"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCustomTest((e.target as HTMLInputElement).value);
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              handleCustomTest(input.value);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Tester
          </button>
        </div>
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
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-gray-600">{result.url}</span>
                  <span className="text-xs text-gray-500">{result.timestamp}</span>
                </div>
                <p className={`text-xs ${
                  result.status === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avertissement */}
      <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note :</strong> En mode web, l'interception se fait uniquement via l'extension navigateur. 
          Installez l'extension pour tester l'interception automatique réelle.
        </p>
      </div>
    </div>
  );
}