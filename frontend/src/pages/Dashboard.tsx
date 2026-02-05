import { useState } from "react";
import MainLayout from "../components/MainLayout";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";
import { useEffect } from "react";

// Icons Components
import {
    Link as LinkIcon,
    Bug,
    CheckCircle,
    ChevronDown
} from "lucide-react";

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

export default function Dashboard() {
    // 1. ÉTATS (STATES) - Doivent être à l'intérieur du composant
    const [isLoading, setIsLoading] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [analyses, setAnalyses] = useState([
        { url: "https://actualite-info.biz/urgence-secu", date: "2023-10-26 14:30", risk: "dangereux", status: "Bloqué" },
        { url: "https://ma-banque-en-ligne.fr/login", date: "2023-10-26 10:15", risk: "suspect", status: "Bloqué" },
        { url: "https://rapport-finance.com/Q3-2023", date: "2023-10-25 18:45", risk: "sûr", status: "Nettoyé" },
    ]);

    const [user, setUser] = useState<{username: string} | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
    const handleAnalyze = async () => {
    if (!urlInput) return alert("Veuillez entrer une URL");

    setIsLoading(true);
    try {
        // 1. Récupérer le token stocké lors de la connexion
        const token = localStorage.getItem('token'); 

        const response = await fetch('http://localhost:3000/analyse-lien/process', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // 2. Ajouter le token ici
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
                risk: data.niveau_risque, 
                status: data.statut === 'bloqué' ? "Bloqué" : "Nettoyé"
            };
            
            setAnalyses(prevAnalyses => [newEntry, ...prevAnalyses]);
            setUrlInput(""); 
        } else {
            // Si le token est expiré ou invalide, le backend renverra un 401
            if (response.status === 401) {
                alert("Votre session a expiré. Veuillez vous reconnecter.");
            } else {
                alert(`Erreur: ${data.message}`);
            }
        }
    } catch (error) {
        console.error("Connection failed:", error);
        alert("Impossible de contacter le serveur.");
    } finally {
        setIsLoading(false);
    }
};

    return (
        <MainLayout title={`Bonjour, ${user?.username || 'Utilisateur'} !`} subtitle="Voici un aperçu de votre sécurité.">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-5 mb-6">
                <StatCard title="Liens analysés" value={analyses.length} subtitle="Total des URL vérifiées" icon={LinkIcon} iconColor="#4a8a9a" />
                <StatCard title="Liens bloqués" value={analyses.filter(a => a.status === "Bloqué").length} subtitle="Accès malveillant empêchés" icon={ShieldBlockIcon as any} iconColor="#1a9a7a" />
                <StatCard title="Menaces détectées" value={analyses.filter(a => a.risk === "dangereux").length} subtitle="Vulnérabilités identifiées" icon={Bug} iconColor="#1a9a7a" />
            </div>

            <div className="content-grid">
                {/* Subscription Card */}
                <div className="subscription-card">
                    <div className="subscription-header">
                        <h3>Statut d'abonnement</h3>
                        <span className="badge">Freemium</span>
                    </div>
                    <p className="subscription-description">Plan actuel : Protection essentielle.</p>
                    <button className="upgrade-button">Passer au premium</button>
                </div>

                {/* Analysis Table */}
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
                            {analyses.map((item, index) => (
                                <tr key={index}>
                                    <td><a href="#" className="url-link">{item.url}</a></td>
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
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Analysis Input */}
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