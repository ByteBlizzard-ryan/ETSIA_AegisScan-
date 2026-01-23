import "./dashboard.css"


const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
    </svg>
)

const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
)

const HistoryIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
)

const BlockedIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
)

const StatsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
)

const HelpIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
)

const ProfileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
)

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
)

const LinkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
)

const ShieldBlockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <circle cx="12" cy="11" r="4"/>
        <line x1="10" y1="9" x2="14" y2="13"/>
    </svg>
)

const BugIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2l1.88 1.88"/>
        <path d="M14.12 3.88L16 2"/>
        <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>
        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/>
        <path d="M12 20v-9"/>
        <path d="M6.53 9C4.6 8.8 3 7.1 3 5"/>
        <path d="M6 13H2"/>
        <path d="M3 21c0-2.1 1.7-3.9 3.8-4"/>
        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/>
        <path d="M22 13h-4"/>
        <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
    </svg>
)

const CheckCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
)

const LinkInputIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="logo">
                        <div className="logo-icon">
                            <ShieldIcon />
                        </div>
                        <span className="logo-text">Aegis<span>Scan</span></span>
                    </div>

                    <nav className="nav-menu">
                        <a href="#" className="nav-item active">
                            <DashboardIcon />
                            Dashboard
                        </a>
                        <a href="#" className="nav-item">
                            <HistoryIcon />
                            Historique
                        </a>
                        <a href="#" className="nav-item">
                            <BlockedIcon />
                            Liens bloqués
                        </a>
                        <a href="#" className="nav-item">
                            <StatsIcon />
                            Statistiques
                        </a>
                        <a href="#" className="nav-item">
                            <HelpIcon />
                            Conseils
                        </a>
                    </nav>

                    <div className="nav-bottom">
                        <a href="#" className="nav-item">
                            <ProfileIcon />
                            Profil
                        </a>
                        <a href="#" className="nav-item">
                            <LogoutIcon />
                            Quitter
                        </a>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <div className="greeting">
                        <h1>Bonjour, utilisateur !</h1>
                        <p>Voici un aperçu de votre sécurité.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-content">
                                    <h3>Liens analysés</h3>
                                    <div className="value">0</div>
                                    <div className="label">Total des URL vérifiées</div>
                                </div>
                                <div className="stat-icon links">
                                    <LinkIcon />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-content">
                                    <h3>Liens bloqués</h3>
                                    <div className="value">0</div>
                                    <div className="label">Accès malveillant empêchés</div>
                                </div>
                                <div className="stat-icon blocked">
                                    <ShieldBlockIcon />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-content">
                                    <h3>Menaces détectées</h3>
                                    <div className="value">0</div>
                                    <div className="label">Vulnerabilités identifiées</div>
                                </div>
                                <div className="stat-icon threats">
                                    <BugIcon />
                                </div>
                            </div>
                        </div>
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
                                    <CheckCircleIcon />
                                    <span>Analyse de liens en temps réel</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircleIcon />
                                    <span>Alertes de sécurité de base</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircleIcon />
                                    <span>Assistance IA</span>
                                </div>
                            </div>
                            <button className="upgrade-button">Passer au premium</button>
                        </div>

                        {/* Analysis Table */}
                        <div className="analysis-card">
                            <h3>Dernières analyses</h3>
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
                </main>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© 2026 AegisScan. Tous droits réservés</p>
                <a href="#">Politique de confidentialité</a>
            </footer>
        </div>
    )
}