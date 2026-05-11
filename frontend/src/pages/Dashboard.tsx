import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";
import { extensionSync } from "../services/extensionSync";

// Icons Components
import {
    Link as LinkIcon,
    Bug,
    ShieldAlert,CheckCircle2
} from "lucide-react";

// 1. Définition des structures de données
interface AnalyseData {
    lien: {
        url: string;
    };
    date_analyse: string;
    niveau_risque: string;
    statut: string;
}

interface UserStats {
    totalLinks: number;
    threatsDetected: number;
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
    
    // NOUVEAU : États pour les stats venant du backend
    const [stats, setStats] = useState<UserStats>({
        totalLinks: 0,
        threatsDetected: 0
    });

    // Chargement initial des données
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));

        const fetchData = async () => {
            if (!token) return;

        // Vérifier le statut de l'extension
        const checkExtensionStatus = () => {
            const status = extensionSync.getStatus();
            setExtensionStatus({
                available: status.extensionAvailable,
                synced: status.extensionAvailable
            });
        };

        // Forcer une détection au montage du composant
        extensionSync.forceDetection().then(() => {
            checkExtensionStatus();
        });
        
        // Vérifier périodiquement
        const statusInterval = setInterval(checkExtensionStatus, 3000);

        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            try {
                // Appel 1 : Historique pour le tableau
                const resHistory = await fetch('http://localhost:3000/analyse-lien/historique', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                // Appel 2 : Statistiques pour les compteurs
                const resStats = await fetch('http://localhost:3000/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (resHistory.ok) {
                    const data: AnalyseData[] = await resHistory.json();
                    const formattedData = data.map(item => ({
                        url: item.lien.url,
                        date: new Date(item.date_analyse).toLocaleString(),
                        risk: item.niveau_risque.toLowerCase(),
                        status: item.statut.charAt(0).toUpperCase() + item.statut.slice(1)
                    }));
                    setAnalyses(formattedData);
                }

                if (resStats.ok) {
                    const statsData = await resStats.json();
                    setStats({
                        totalLinks: statsData.totalLinks,
                        threatsDetected: statsData.threatsDetected
                    });
                }
            } catch (error) {
                console.error("Erreur de récupération des données:", error);
            }
        };

        fetchData();
        fetchHistory();

        const handleHistoryUpdated = () => fetchHistory();
        window.addEventListener('history-updated', handleHistoryUpdated);

        return () => {
            clearInterval(statusInterval);
            window.removeEventListener('history-updated', handleHistoryUpdated);
        };
    }, []);

    // Fonction d'actualisation des stats après une action
    const refreshStats = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:3000/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStats({
                    totalLinks: data.totalLinks,
                    threatsDetected: data.threatsDetected
                });
            }
        } catch (e) { console.error(e); }
    };

    const handleAnalyze = async () => {
        if (!urlInput) return alert("Veuillez entrer une URL");

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
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
                    url: data.lien?.url || urlInput,
                    date: new Date().toLocaleString(),
                    risk: data.niveau_risque.toLowerCase(),
                    status: data.statut.charAt(0).toUpperCase() + data.statut.slice(1),
                };

                setAnalyses(prev => [newEntry, ...prev]);
                setUrlInput("");
                // On rafraîchit les compteurs SQL en haut
                await refreshStats();
            } else {
                if (response.status === 401) alert("Session expirée.");
                else alert(`Erreur: ${data.message}`);
            }
        } catch (error) {
            alert("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLinkClick = (e: React.MouseEvent, url: string, risk: string) => {
        if (risk === "dangereux") {
            e.preventDefault();
            alert("🚨 Action bloquée : Ce lien a été identifié comme dangereux par AegisScan.");
        }
    };

    return (
        <MainLayout title={`Bonjour, ${user?.username || 'Utilisateur'} !`} subtitle="Voici un aperçu de votre sécurité.">
        <MainLayout title={`Bonjour, ${user?.username || 'Utilisateur'} !`} subtitle="Voici un aperçu de votre sécurité.">
            {/* Indicateur de statut de l'extension */}
            <div className={`mb-4 p-3 rounded-lg border ${
                extensionStatus.available 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-orange-50 border-orange-200'
            }`}>
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                        extensionStatus.available ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${
                            extensionStatus.available ? 'text-green-800' : 'text-orange-800'
                        }`}>
                            {extensionStatus.available 
                                ? '🛡️ Protection automatique active' 
                                : '⚠️ Extension navigateur non détectée'
                            }
                        </p>
                        <p className={`text-xs ${
                            extensionStatus.available ? 'text-green-600' : 'text-orange-600'
                        }`}>
                            {extensionStatus.available 
                                ? 'Tous vos clics sur des liens sont automatiquement analysés'
                                : "Installez l'extension pour une protection automatique"
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
                                        const detected = await extensionSync.forceDetection();
                                        button.textContent = detected ? 'Détectée !' : 'Non trouvée';
                                        setTimeout(() => { button.textContent = 'Détecter'; button.disabled = false; }, 2000);
                                    } catch { button.textContent = 'Erreur'; setTimeout(() => { button.textContent = 'Détecter'; button.disabled = false; }, 2000); }
                                }}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Détecter
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
                    value={stats.threatsDetected} 
                    subtitle="Accès malveillant empêchés" 
                    icon={ShieldBlockIcon as any} 
                    iconColor="#1a9a7a" 
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
                {/* <div className="subscription-card">
                    <div className="subscription-header">
                        <h3>Statut d'abonnement</h3>
                        <span className="badge">Freemium</span>
                    </div>
                    <p className="subscription-description">Plan actuel : Protection essentielle.</p>
                    <button className="upgrade-button">Passer au premium</button>
                </div> */}

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

    {/* Liste des fonctionnalités sans fichier CSS */}
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
        {[
            "Analyse de liens en temps réel",
            "Alertes de sécurité de base",
            "Assistance IA"
        ].map((feature, index) => (
            <li key={index} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Pousse l'icône à droite
                fontSize: "0.85rem",
                color: "#4b5563",
                marginBottom: "10px",
                paddingRight: "5px"
            }}>
                {feature}
                <CheckCircle2 
                    size={14} // Taille réduite pour plus de finesse
                    style={{ color: "#10b981", flexShrink: 0 }} 
                />
            </li>
        ))}
    </ul>

    <button className="upgrade-button">Passer au premium</button>
</div>
                {/* Analysis Table - Limitée à 7 lignes via .slice(0, 7) */}
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
                            {/* On ne change pas l'état 'analyses', on limite juste la vue ici */}
                            {analyses.slice(0, 7).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`url-link ${item.risk === "dangereux" ? "disabled-link" : ""}`}
                                            onClick={(e) => handleLinkClick(e, item.url, item.risk)}
                                        >
                                            {truncateURL(item.url)}
                                        </a>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <span className={`risk-badge ${item.risk === "dangereux" ? "high" : item.risk === "suspect" ? "medium" : "low"}`}>
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
                            {/* Optionnel : Afficher un message si aucune analyse n'est présente */}
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

            <div className="quick-analysis">
                <h3>Analyse rapide</h3>
                <div className="analysis-input-wrapper">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Coller un lien à analyser"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
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
            </div>
        </MainLayout>
    );
}