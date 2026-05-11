import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";
import { extensionSync } from "../services/extensionSync";
import { getValidToken, clearAuthData } from "../utils/auth";
import { authService } from "../services/authService";

// Icons Components
import {
    Link as LinkIcon,
    Bug,
    ShieldAlert,
    CheckCircle2
} from "lucide-react";

// 1. Définition des structures de données
interface AnalyseData {
    id_analyse: string;
    lien: {
        id_lien: string;
        url: string;
    };
    date_analyse: string;
    niveau_risque: string;
    statut: string;
    motifs?: string;
}

interface UserStats {
    totalLinks: number;
    threatsDetected: number;
    linksBlocked: number;
}

// Custom SVG Icons
const ShieldBlockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="4" />
        <line x1="10" y1="9" x2="14" y2="13" />
    </svg>
);

const LinkInputIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const truncateURL = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
};

export default function Dashboard() {
    // ÉTATS
    const [isLoading, setIsLoading] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [analyses, setAnalyses] = useState<any[]>([]);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [showIgnoreModal, setShowIgnoreModal] = useState(false);
    const [selectedLink, setSelectedLink] = useState<{id: string, url: string} | null>(null);
    const [ignoreReason, setIgnoreReason] = useState("");
    const [analysisResult, setAnalysisResult] = useState<{
        message: string;
        type: 'success' | 'warning' | 'error';
        visible: boolean;
    }>({
        message: "",
        type: 'success',
        visible: false
    });

    // État pour les stats venant du backend
    const [stats, setStats] = useState<UserStats>({
        totalLinks: 0,
        threatsDetected: 0,
        linksBlocked: 0
    });

    // État pour le statut de l'extension
    const [extensionStatus, setExtensionStatus] = useState({
        available: false,
        synced: false
    });

    // ─── Fonction utilitaire : récupérer les stats ─────────────────────────────
    const refreshStats = async () => {
        const token = getValidToken();
        if (!token) {
            console.error("Token invalide ou expiré");
            clearAuthData();
            return;
        }
        
        try {
            const res = await fetch('http://localhost:3000/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.status === 401) {
                console.error("Token expiré lors du rafraîchissement des stats");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return;
            }
            
            if (res.ok) {
                const data = await res.json();
                setStats({
                    totalLinks: data.totalLinks,
                    threatsDetected: data.threatsDetected,
                    linksBlocked: data.linksBlocked || 0
                });
            }
        } catch (e) {
            console.error('Erreur lors du rafraîchissement des stats', e);
        }
    };

    // ─── Fonction utilitaire : récupérer l'historique + stats ─────────────────
    const fetchHistory = async () => {
        const token = getValidToken();
        if (!token) {
            console.error("Token invalide ou expiré");
            clearAuthData();
            return;
        }
        
        try {
            const resHistory = await fetch('http://localhost:3000/analyse-lien/historique', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const resStats = await fetch('http://localhost:3000/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (resHistory.status === 401 || resStats.status === 401) {
                console.error("Token expiré, redirection vers la connexion nécessaire");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Optionnel: rediriger vers la page de connexion
                return;
            }

            if (resHistory.ok) {
                const data: AnalyseData[] = await resHistory.json();
                const formattedData = data.map(item => ({
                    id: item.id_analyse,
                    linkId: item.lien.id_lien,
                    url: item.lien.url,
                    date: new Date(item.date_analyse).toLocaleString(),
                    risk: item.niveau_risque.toLowerCase(),
                    status: item.statut.charAt(0).toUpperCase() + item.statut.slice(1),
                    motifs: item.motifs
                }));
                setAnalyses(formattedData);
            }

            if (resStats.ok) {
                const statsData = await resStats.json();
                setStats({
                    totalLinks: statsData.totalLinks,
                    threatsDetected: statsData.threatsDetected,
                    linksBlocked: statsData.linksBlocked || 0
                });
            }
        } catch (error) {
            console.error("Erreur de récupération des données:", error);
        }
    };

    // ─── Chargement initial ───────────────────────────────────────────────────
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));

        // Synchroniser le token avec l'extension au chargement
        const syncTokenWithExtension = async () => {
            console.log("[Dashboard] Synchronisation automatique du token avec l'extension");
            await authService.forceSyncWithExtension();
        };

        // Vérifier le statut de l'extension
        const checkExtensionStatus = () => {
            const status = extensionSync.getStatus();
            setExtensionStatus({
                available: status.extensionAvailable,
                synced: status.extensionAvailable
            });
        };

        // Forcer une détection au montage
        extensionSync.forceDetection().then((detected) => {
            checkExtensionStatus();
            if (detected) {
                // Si l'extension est détectée, synchroniser le token
                syncTokenWithExtension();
            }
        });

        // Vérifier périodiquement
        const statusInterval = setInterval(() => {
            checkExtensionStatus();
            // Le service d'authentification gère déjà la synchronisation automatique
        }, 5000); // Vérifier toutes les 5 secondes

        // Charger les données initiales
        fetchHistory();

        // Écouter les mises à jour d'historique
        const handleHistoryUpdated = () => fetchHistory();
        window.addEventListener('history-updated', handleHistoryUpdated);

        return () => {
            clearInterval(statusInterval);
            window.removeEventListener('history-updated', handleHistoryUpdated);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Handler : analyser un lien manuellement ─────────────────────────────
    const handleAnalyze = async () => {
        if (!urlInput) {
            setAnalysisResult({
                message: "Veuillez entrer une URL valide",
                type: 'error',
                visible: true
            });
            setTimeout(() => setAnalysisResult(prev => ({...prev, visible: false})), 3000);
            return;
        }

        setIsLoading(true);
        setAnalysisResult({message: "", type: 'success', visible: false});
        
        try {
            const token = getValidToken();
            if (!token) {
                setAnalysisResult({
                    message: "Session expirée. Veuillez vous reconnecter.",
                    type: 'error',
                    visible: true
                });
                setTimeout(() => setAnalysisResult(prev => ({...prev, visible: false})), 5000);
                return;
            }

            const response = await fetch('http://localhost:3000/analyse-lien/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    url: urlInput,
                    canal_source: 'Web Dashboard'
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const newEntry = {
                    id: data.id_analyse,
                    linkId: data.lien?.id_lien,
                    url: data.lien?.url || urlInput,
                    date: new Date().toLocaleString(),
                    risk: data.niveau_risque.toLowerCase(),
                    status: data.statut.charAt(0).toUpperCase() + data.statut.slice(1),
                    motifs: data.motifs
                };

                setAnalyses(prev => [newEntry, ...prev]);
                setUrlInput("");
                
                // Afficher le message de résultat
                let message = "";
                let type: 'success' | 'warning' | 'error' = 'success';
                
                switch(data.niveau_risque.toLowerCase()) {
                    case 'sûr':
                        message = `✅ Lien sûr ! Ce lien ne présente aucun danger.`;
                        type = 'success';
                        break;
                    case 'suspect':
                        message = `⚠️ Lien suspect ! Ce lien pourrait présenter des risques. Soyez prudent.`;
                        type = 'warning';
                        break;
                    case 'dangereux':
                        message = `🚨 Lien dangereux ! Ce lien a été bloqué pour votre sécurité.`;
                        type = 'error';
                        break;
                    default:
                        message = `Analyse terminée. Niveau de risque : ${data.niveau_risque}`;
                        type = 'success';
                }
                
                setAnalysisResult({
                    message,
                    type,
                    visible: true
                });
                
                // Masquer le message après 5 secondes
                setTimeout(() => setAnalysisResult(prev => ({...prev, visible: false})), 5000);
                
                // Rafraîchir les compteurs
                await refreshStats();
            } else {
                let errorMessage = "Erreur lors de l'analyse";
                if (response.status === 401) {
                    errorMessage = "Session expirée. Veuillez vous reconnecter.";
                } else if (data.message) {
                    errorMessage = data.message;
                }
                
                setAnalysisResult({
                    message: errorMessage,
                    type: 'error',
                    visible: true
                });
                setTimeout(() => setAnalysisResult(prev => ({...prev, visible: false})), 5000);
            }
        } catch (error) {
            console.error("Erreur d'analyse:", error);
            setAnalysisResult({
                message: "Impossible de contacter le serveur. Vérifiez votre connexion.",
                type: 'error',
                visible: true
            });
            setTimeout(() => setAnalysisResult(prev => ({...prev, visible: false})), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLinkClick = (e: React.MouseEvent, url: string, risk: string, linkId?: string) => {
        if (risk === "dangereux") {
            e.preventDefault();
            alert("🚨 Action bloquée : Ce lien a été identifié comme dangereux par AegisScan.");
        } else if (risk === "suspect") {
            e.preventDefault();
            const userChoice = confirm("⚠️ Attention : Ce lien est suspect. Voulez-vous continuer malgré l'avertissement ?");
            if (userChoice && linkId) {
                // Ouvrir le modal pour demander la raison
                setSelectedLink({id: linkId, url});
                setShowIgnoreModal(true);
            }
        }
    };

    // Fonction pour bloquer un lien et ignorer l'avertissement
    const handleIgnoreWarning = async () => {
        if (!selectedLink || !ignoreReason.trim()) {
            alert("Veuillez fournir une raison pour ignorer cet avertissement.");
            return;
        }

        try {
            const token = getValidToken();
            if (!token) {
                alert("Session expirée. Veuillez vous reconnecter.");
                return;
            }
            const response = await fetch('http://localhost:3000/analyse-lien/block-and-ignore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    linkId: selectedLink.id,
                    motifIgnore: ignoreReason
                }),
            });

            if (response.ok) {
                // Ouvrir le lien dans un nouvel onglet
                window.open(selectedLink.url, '_blank');
                
                // Rafraîchir les données
                await fetchHistory();
                
                // Fermer le modal
                setShowIgnoreModal(false);
                setSelectedLink(null);
                setIgnoreReason("");
                
                alert("Lien ouvert. L'action a été enregistrée comme ignorée.");
            } else {
                alert("Erreur lors de l'enregistrement de l'action.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur de connexion au serveur.");
        }
    };

    return (
        <MainLayout title={`Bonjour, ${user?.username || 'Utilisateur'} !`} subtitle="Voici un aperçu de votre sécurité.">
            {/* Indicateur de statut de l'extension */}
            <div className={`mb-4 p-3 rounded-lg border ${extensionStatus.available
                    ? 'bg-green-50 border-green-200'
                    : 'bg-orange-50 border-orange-200'
                }`}>
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${extensionStatus.available ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${extensionStatus.available ? 'text-green-800' : 'text-orange-800'
                            }`}>
                            {extensionStatus.available
                                ? '🛡️ Protection automatique active'
                                : '⚠️ Extension navigateur non détectée'
                            }
                        </p>
                        <p className={`text-xs ${extensionStatus.available ? 'text-green-600' : 'text-orange-600'
                            }`}>
                            {extensionStatus.available
                                ? 'Tous vos clics sur des liens sont automatiquement analysés. Le token est synchronisé automatiquement.'
                                : "Installez l'extension pour une protection automatique. Après installation, cliquez sur 'Détecter' puis 'Synchroniser'."
                            }
                        </p>
                    </div>
                    {!extensionStatus.available && (
                        <div className="flex gap-2">
                            <button
                                onClick={async (event) => {
                                    const button = event.target as HTMLButtonElement;
                                    button.textContent = 'Détection...';
                                    button.disabled = true;
                                    try {
                                        console.log('[Dashboard] Début détection manuelle...');
                                        const detected = await extensionSync.forceDetection();
                                        
                                        if (detected) {
                                            button.textContent = 'Détectée !';
                                            button.style.backgroundColor = '#10b981';
                                            
                                            // Mettre à jour le statut
                                            setExtensionStatus({
                                                available: true,
                                                synced: true
                                            });
                                        } else {
                                            button.textContent = 'Non trouvée';
                                            button.style.backgroundColor = '#f59e0b';
                                        }
                                        
                                        setTimeout(() => {
                                            button.textContent = 'Détecter';
                                            button.style.backgroundColor = '';
                                            button.disabled = false;
                                        }, 3000);
                                    } catch (error) {
                                        console.error('[Dashboard] Erreur détection:', error);
                                        button.textContent = 'Erreur';
                                        button.style.backgroundColor = '#ef4444';
                                        setTimeout(() => {
                                            button.textContent = 'Détecter';
                                            button.style.backgroundColor = '';
                                            button.disabled = false;
                                        }, 3000);
                                    }
                                }}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Détecter
                            </button>
                        </div>
                    )}
                    {extensionStatus.available && (
                        <div className="flex gap-2">
                            <button
                                onClick={async (event) => {
                                    const button = event.target as HTMLButtonElement;
                                    const originalText = button.textContent;
                                    button.textContent = 'Sync...';
                                    button.disabled = true;
                                    try {
                                        console.log('[Dashboard] Début synchronisation manuelle...');
                                        
                                        // Synchronisation via Tauri si disponible
                                        const isTauriMode = window.location.protocol === 'tauri:' || 
                                                          window.location.hostname === 'tauri.localhost' || 
                                                          !!(window as any).__TAURI_INTERNALS__ || 
                                                          !!(window as any).__TAURI__;
                                        
                                        if (isTauriMode) {
                                            try {
                                                const { invoke } = await import('@tauri-apps/api/core');
                                                const token = localStorage.getItem('token');
                                                if (token) {
                                                    await invoke('sync_extension_token', { token });
                                                    console.log('[Dashboard] ✅ Synchronisation Tauri réussie');
                                                    button.textContent = 'Sync Tauri OK !';
                                                    button.style.backgroundColor = '#10b981';
                                                } else {
                                                    throw new Error('Pas de token disponible');
                                                }
                                            } catch (tauriError) {
                                                console.error('[Dashboard] Erreur Tauri:', tauriError);
                                                // Fallback vers la méthode classique
                                                const success = await authService.forceSyncWithExtension();
                                                button.textContent = success ? 'Sync Web OK !' : 'Échec';
                                                button.style.backgroundColor = success ? '#10b981' : '#ef4444';
                                            }
                                        } else {
                                            const success = await authService.forceSyncWithExtension();
                                            button.textContent = success ? 'Synchronisé !' : 'Échec';
                                            button.style.backgroundColor = success ? '#10b981' : '#ef4444';
                                        }
                                        
                                        // Vérifier le statut après synchronisation
                                        setTimeout(() => {
                                            const status = extensionSync.getStatus();
                                            setExtensionStatus({
                                                available: status.extensionAvailable,
                                                synced: status.extensionAvailable
                                            });
                                        }, 1000);
                                        
                                        setTimeout(() => {
                                            button.textContent = originalText;
                                            button.style.backgroundColor = '';
                                            button.disabled = false;
                                        }, 3000);
                                    } catch (error) {
                                        console.error('[Dashboard] Erreur synchronisation:', error);
                                        button.textContent = 'Erreur';
                                        button.style.backgroundColor = '#ef4444';
                                        setTimeout(() => {
                                            button.textContent = originalText;
                                            button.style.backgroundColor = '';
                                            button.disabled = false;
                                        }, 3000);
                                    }
                                }}
                                className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                Synchroniser
                            </button>
                            <button
                                onClick={() => {
                                    const token = localStorage.getItem('token');
                                    console.log('[Dashboard] Debug - Token local:', token ? 'Présent' : 'Absent');
                                    if (token) {
                                        try {
                                            const payload = JSON.parse(atob(token.split('.')[1]));
                                            const currentTime = Date.now() / 1000;
                                            const timeLeft = Math.round((payload.exp - currentTime) / 60);
                                            console.log('[Dashboard] Debug - Token expire dans:', timeLeft, 'minutes');
                                            alert(`Token local: ${timeLeft > 0 ? `Valide (${timeLeft}min restantes)` : 'EXPIRÉ'}`);
                                        } catch (e) {
                                            console.error('[Dashboard] Debug - Token invalide:', e);
                                            alert('Token local: INVALIDE');
                                        }
                                    } else {
                                        alert('Token local: ABSENT');
                                    }
                                }}
                                className="px-2 py-1 bg-gray-500 text-white text-xs rounded-md hover:bg-gray-600 transition-colors"
                                title="Vérifier le statut du token local"
                            >
                                Debug
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        console.log('[Dashboard] Test connexion backend...');
                                        const token = localStorage.getItem('token');
                                        if (!token) {
                                            alert('Pas de token - connectez-vous d\'abord');
                                            return;
                                        }
                                        
                                        const response = await fetch('http://localhost:3000/analyse-lien/process', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${token}`
                                            },
                                            body: JSON.stringify({
                                                url: 'https://www.google.com',
                                                canal_source: 'Test Dashboard'
                                            })
                                        });
                                        
                                        console.log('[Dashboard] Réponse backend:', response.status);
                                        
                                        if (response.ok) {
                                            const data = await response.json();
                                            console.log('[Dashboard] Données reçues:', data);
                                            alert(`✅ Backend OK - Niveau: ${data.niveau_risque}`);
                                        } else {
                                            const error = await response.text();
                                            console.error('[Dashboard] Erreur backend:', error);
                                            alert(`❌ Backend Error: ${response.status} - ${error}`);
                                        }
                                    } catch (error) {
                                        console.error('[Dashboard] Erreur test:', error);
                                        alert(`❌ Erreur: ${error.message}`);
                                    }
                                }}
                                className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                                title="Tester la connexion au backend"
                            >
                                Test API
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-5 mb-6">
                <StatCard
                    title="Liens analysés"
                    value={stats.totalLinks}
                    subtitle="Total des URL vérifiées"
                    icon={LinkIcon}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Liens bloqués"
                    value={stats.linksBlocked}
                    subtitle="Accès malveillant empêchés"
                    icon={ShieldBlockIcon as any}
                    iconColor="#ef4444"
                />
                <StatCard
                    title="Menaces détectées"
                    value={stats.threatsDetected}
                    subtitle="Vulnérabilités identifiées"
                    icon={Bug}
                    iconColor="#1a9a7a"
                />
            </div>

            <div className="content-grid">
                {/* Abonnement */}
                <div className="subscription-card">
                    <div className="subscription-header">
                        <h3>Statut d'abonnement</h3>
                        <span className="badge">Freemium</span>
                    </div>

                    <p style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.5",
                        color: "#374151",
                        marginBottom: "15px"
                    }}>
                        Votre plan actuel offre une protection essentielle.
                        Passer au premium pour des fonctionnalités avancées.
                    </p>

                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                        {[
                            "Analyse de liens en temps réel",
                            "Alertes de sécurité de base",
                            "Assistance IA"
                        ].map((feature, index) => (
                            <li key={index} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: "0.85rem",
                                color: "#4b5563",
                                marginBottom: "10px",
                                paddingRight: "5px"
                            }}>
                                {feature}
                                <CheckCircle2
                                    size={14}
                                    style={{ color: "#10b981", flexShrink: 0 }}
                                />
                            </li>
                        ))}
                    </ul>

                    <button className="upgrade-button">Passer au premium</button>
                </div>

                {/* Tableau des analyses */}
                <div className="analysis-card">
                    <div className="analysis-header">
                        <h3>Dernières analyses</h3>
                    </div>
                    <table className="analysis-table">
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Date</th>
                                <th>Niveau de risque</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyses.slice(0, 7).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`url-link ${item.risk === "dangereux" ? "disabled-link" : ""}`}
                                            onClick={(e) => handleLinkClick(e, item.url, item.risk, item.linkId)}
                                            title={item.motifs || ""}
                                        >
                                            {truncateURL(item.url)}
                                        </a>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <span className={`risk-badge ${
                                            item.risk === "dangereux" ? "high" : 
                                            item.risk === "suspect" ? "medium" : "low"
                                        }`}>
                                            {item.risk}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${item.status === "Bloqué" ? "blocked" : "cleaned"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {analyses.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                        Aucune analyse récente.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Analyse rapide */}
            <div className="quick-analysis">
                <h3>Analyse rapide</h3>
                <div className="analysis-input-wrapper">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Coller un lien à analyser"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleAnalyze();
                                }
                            }}
                        />
                        <LinkInputIcon />
                    </div>
                    <button
                        className="analyze-button"
                        onClick={handleAnalyze}
                        disabled={isLoading}
                    >
                        {isLoading ? "Analyse en cours..." : "Analyser le lien"}
                    </button>
                </div>
                
                {/* Message de résultat d'analyse */}
                {analysisResult.visible && (
                    <div className={`analysis-result ${analysisResult.type}`}>
                        <div className="result-content">
                            <span className="result-message">{analysisResult.message}</span>
                            <button 
                                className="close-result"
                                onClick={() => setAnalysisResult(prev => ({...prev, visible: false}))}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal pour ignorer l'avertissement */}
            {showIgnoreModal && (
                <div className="modal-overlay" onClick={() => setShowIgnoreModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Ignorer l'avertissement</h3>
                        <p>Vous êtes sur le point d'accéder à un lien suspect :</p>
                        <p className="url-display">{selectedLink?.url}</p>
                        <div className="form-group">
                            <label htmlFor="ignore-reason">Raison de l'ignorance :</label>
                            <textarea
                                id="ignore-reason"
                                value={ignoreReason}
                                onChange={(e) => setIgnoreReason(e.target.value)}
                                placeholder="Expliquez pourquoi vous souhaitez ignorer cet avertissement..."
                                rows={3}
                            />
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="cancel-button" 
                                onClick={() => {
                                    setShowIgnoreModal(false);
                                    setSelectedLink(null);
                                    setIgnoreReason("");
                                }}
                            >
                                Annuler
                            </button>
                            <button 
                                className="confirm-button" 
                                onClick={handleIgnoreWarning}
                                disabled={!ignoreReason.trim()}
                            >
                                Continuer malgré l'avertissement
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}