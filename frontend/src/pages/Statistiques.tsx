import {
    Link2,
    ShieldOff,
    ShieldCheck,
    Target,
    CheckCircle,
    LayoutDashboard,
    List,
    BarChart3,
    HelpCircle,
    User,
    LogOut,
    ChevronDown,
    Shield,
    Diamond
} from "lucide-react"

import "./statistiques.css"

export default function Statistiques() {
    return (
        <div className="stats-container">
            <div className="stats-wrapper">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="logo">
                        <Shield className="logo-icon" />
                        <span className="logo-text">AegisScan</span>
                    </div>

                    <nav className="nav-menu">
                        <a href="#" className="nav-item">
                            <LayoutDashboard />
                            <span>Dashboard</span>
                        </a>
                        <a href="#" className="nav-item">
                            <List />
                            <span>Historique</span>
                        </a>
                        <a href="#" className="nav-item">
                            <ShieldOff />
                            <span>Liens bloqués</span>
                        </a>
                        <a href="#" className="nav-item active">
                            <BarChart3 />
                            <span>Statistiques</span>
                        </a>
                        <a href="#" className="nav-item">
                            <HelpCircle />
                            <span>Conseils</span>
                        </a>

                        <div className="nav-bottom">
                            <a href="#" className="nav-item">
                                <User />
                                <span>Profil</span>
                            </a>
                            <a href="#" className="nav-item">
                                <LogOut />
                                <span>Quitter</span>
                            </a>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    {/* Header */}
                    <div className="page-header">
                        <h1 className="page-title">Statistiques</h1>
                        <button className="date-selector">
                            <span>Derniers 7 jours</span>
                            <ChevronDown />
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-cards">
                        <div className="stat-card">
                            <div className="stat-header">
                                <span className="stat-label">Liens analysés</span>
                                <Link2 className="stat-icon" />
                            </div>
                            <div className="stat-value">0</div>
                            <div className="stat-change">+ 0% depuis le mois dernier</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <span className="stat-label">Menaces détectées</span>
                                <ShieldCheck className="stat-icon" />
                            </div>
                            <div className="stat-value">0</div>
                            <div className="stat-change">- 0% cette semaine</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <span className="stat-label">Score de risque moyen</span>
                                <Target className="stat-icon" />
                            </div>
                            <div className="stat-value">0/10</div>
                            <div className="stat-status stable">Stable</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <span className="stat-label">Taux de protection</span>
                                <CheckCircle className="stat-icon" />
                            </div>
                            <div className="stat-value">0%</div>
                            <div className="stat-status excellent">Excellent</div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="charts-section">
                        {/* Line Chart */}
                        <div className="chart-card">
                            <h3 className="chart-title">Performance des Liens Analysés</h3>
                            <p className="chart-description">
                                Nombre total et unique de liens analysés sur la période sélectionnée.
                            </p>
                            <div className="chart-container">
                                <div className="line-chart">
                                    <div className="chart-y-axis">
                                        <span>210</span>
                                        <span>175</span>
                                        <span>140</span>
                                        <span>105</span>
                                        <span>70</span>
                                    </div>
                                    <div className="chart-area">
                                        <svg className="line-chart-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                                            {/* Grid lines */}
                                            <line x1="0" y1="0" x2="400" y2="0" stroke="#e8ecef" strokeDasharray="4" />
                                            <line x1="0" y1="50" x2="400" y2="50" stroke="#e8ecef" strokeDasharray="4" />
                                            <line x1="0" y1="100" x2="400" y2="100" stroke="#e8ecef" strokeDasharray="4" />
                                            <line x1="0" y1="150" x2="400" y2="150" stroke="#e8ecef" strokeDasharray="4" />

                                            {/* Total Liens line (blue) */}
                                            <path
                                                d="M 0 180 L 66 180 L 133 180 L 200 180 L 266 180 L 333 180 L 400 180"
                                                className="chart-line total"
                                            />

                                            {/* Liens Uniques line (green) */}
                                            <path
                                                d="M 0 190 L 66 190 L 133 190 L 200 190 L 266 190 L 333 190 L 400 190"
                                                className="chart-line unique"
                                            />
                                        </svg>
                                    </div>
                                    <div className="chart-x-axis">
                                        <span>Lun 15</span>
                                        <span>Mar 16</span>
                                        <span>Mer 17</span>
                                        <span>Jeu 18</span>
                                        <span>Ven 19</span>
                                        <span>Sam 20</span>
                                        <span>Dim 21</span>
                                    </div>
                                </div>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <span className="legend-dot blue"></span>
                                        <span>Total Liens</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot green"></span>
                                        <span>Liens Uniques</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Donut Chart */}
                        <div className="chart-card">
                            <h3 className="chart-title">Distribution des Menaces par gravité</h3>
                            <p className="chart-description">
                                Répartition des menaces détectées par niveau de gravité.
                            </p>
                            <div className="chart-container">
                                <div className="donut-chart-container">
                                    <div className="donut-chart">
                                        <svg viewBox="0 0 100 100">
                                            {/* Background circle */}
                                            <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />

                                            {/* Empty state */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="35"
                                                stroke="#9aa5b0"
                                                strokeWidth="20"
                                                fill="none"
                                                strokeDasharray="0 220"
                                                strokeDashoffset="0"
                                            />
                                        </svg>
                                        <div className="donut-labels">
                                            <span className="donut-label" style={{ top: "15%", right: "15%" }}>
                                                0
                                            </span>
                                            <span className="donut-label" style={{ top: "40%", right: "0%" }}>
                                                0
                                            </span>
                                            <span className="donut-label" style={{ bottom: "20%", right: "25%" }}>
                                                0
                                            </span>
                                        </div>
                                    </div>
                                    <div className="chart-pagination">
                                        <span className="pagination-dot active"></span>
                                        <span className="pagination-dot"></span>
                                        <span className="pagination-dot"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Banner */}
                    <div className="premium-banner">
                        <div className="banner-header">
                            <Diamond className="banner-icon" />
                            <h3 className="banner-title">Débloquez plus de statistiques avec Premium !</h3>
                        </div>
                        <p className="banner-description">
                            Passez à Premium pour accéder à des analyses de données plus approfondies, des périodes de rétention plus
                            longues et des rapports personnalisables.
                        </p>
                        <button className="premium-button">Passer à Premium</button>
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