import MainLayout from "../components/MainLayout";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css"

// Icons Components
import {
    Link as LinkIcon,
    Bug,
    CheckCircle,
    ChevronDown
} from "lucide-react"

// Custom SVG Icons (gardés pour la cohérence)
const ShieldBlockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="4" />
        <line x1="10" y1="9" x2="14" y2="13" />
    </svg>
)

const LinkInputIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
)

// Data
const analyses = [
    { url: "https://actualite-info.biz/urgence-secu", date: "2023-10-26 14:30", risk: "Élevé", status: "Bloqué" },
    { url: "https://ma-banque-en-ligne.fr/login", date: "2023-10-26 10:15", risk: "Moyen", status: "Bloqué" },
    { url: "https://rapport-finance.com/Q3-2023", date: "2023-10-25 18:45", risk: "Faible", status: "Nettoyé" },
    { url: "https://e-commerce-promo.store/offres", date: "2023-10-25 11:00", risk: "Moyen", status: "Nettoyé" },
    { url: "https://support-technique-microsoft.com/aide", date: "2023-10-24 09:20", risk: "Élevé", status: "Bloqué" },
]

export default function Dashboard() {
    return (
        <MainLayout
            title="Bonjour, utilisateur !"
            subtitle="Voici un aperçu de votre sécurité."
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-5 mb-6">
                <StatCard
                    title="Liens analysés"
                    value={0}
                    subtitle="Total des URL vérifiées"
                    icon={LinkIcon}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Liens bloqués"
                    value={0}
                    subtitle="Accès malveillant empêchés"
                    icon={ShieldBlockIcon as any}
                    iconColor="#1a9a7a"
                />
                <StatCard
                    title="Menaces détectées"
                    value={0}
                    subtitle="Vulnérabilités identifiées"
                    icon={Bug}
                    iconColor="#1a9a7a"
                />
            </div>

            {/* Content Grid */}
            <div className="content-grid">
                {/* Subscription Card */}
                <div className="subscription-card">
                    <div className="subscription-header">
                        <h3>Statut d'abonnement</h3>
                        <span className="badge">Freemium</span>
                    </div>
                    <p className="subscription-description">
                        Votre plan actuel offre une protection essentielle. Passez au premium pour des fonctionnalités avancées.
                    </p>
                    <div className="features-list">
                        <div className="feature-item">
                            <CheckCircle />
                            <span>Analyse de liens en temps réel</span>
                        </div>
                        <div className="feature-item">
                            <CheckCircle />
                            <span>Alertes de sécurité de base</span>
                        </div>
                        <div className="feature-item">
                            <CheckCircle />
                            <span>Assistance IA</span>
                        </div>
                    </div>
                    <button className="upgrade-button">Passer au premium</button>
                </div>

                {/* Analysis Table */}
                <div className="analysis-card">
                    <div className="analysis-header">
                        <h3>Dernières analyses</h3>
                        <button className="view-all">
                            Voir tout
                            <ChevronDown size={16} />
                        </button>
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
                                    <td>
                                        <a href="#" className="url-link">{item.url}</a>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <span className={`risk-badge ${item.risk === "Élevé" ? "high" : item.risk === "Moyen" ? "medium" : "low"}`}>
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

            {/* Quick Analysis */}
            <div className="quick-analysis">
                <h3>Analyse rapide</h3>
                <div className="analysis-input-wrapper">
                    <div className="input-container">
                        <input type="text" placeholder="Coller un lien à analyser" />
                        <LinkInputIcon />
                    </div>
                    <button className="analyze-button">Analyser le lien</button>
                </div>
                <p className="analysis-hint">Analyse manuelle immédiate avant ouverture</p>
            </div>
        </MainLayout>
    )
}