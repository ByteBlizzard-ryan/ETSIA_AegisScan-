import { Link } from "react-router-dom";
import "./features.css"

export default function Features() {
    return (
        <div className="features-page">
            {/* Header */}
            <header className="features-header">
                <div className="features-logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span>AegisScan</span>
                </div>
                <nav className="features-nav">
                    <Link to="/">Accueil</Link>
                    <Link to="/features" className="active">Fonctionnalités</Link>
                </nav>
                <button className="header-cta">Téléchargez AegisScan</button>
            </header>

            {/* Hero */}
            <section className="features-hero">
                <h1>Protection complète et intelligente</h1>
                <p>Découvrez l'ensemble des outils conçus pour sécuriser votre navigation, vos e-mails et vos réseaux sociaux en temps réel.</p>
            </section>

            {/* Sécurité Active */}
            <section className="securite-section">
                <h2>Sécurité Active</h2>
                <p>Des technologies avancées pour intercepter et neutraliser les menaces avant qu'elles ne vous atteignent.</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        </div>
                        <h3>Interception des liens</h3>
                        <p>Analyse automatique de tout lien cliqué ou reçu via réseaux sociaux, e-mails et moteurs de recherche avant son ouverture</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h3>Analyse de risque</h3>
                        <p>Évaluation instantanée du niveau de danger de chaque URL pour déterminer sa fiabilité en quelques millisecondes.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M4.93 4.93l14.14 14.14" />
                            </svg>
                        </div>
                        <h3>Blocage proactif</h3>
                        <p>Blocage immédiat du chargement des pages malveillantes avec affichage d'un écran d'avertissement clair</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <h3>Explication des menaces</h3>
                        <p>Comprenez pourquoi un site a été bloqué grâce à des explications détaillées sur la nature du risque détecté.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <line x1="9" y1="3" x2="9" y2="21" />
                                <line x1="15" y1="3" x2="15" y2="21" />
                                <line x1="3" y1="9" x2="21" y2="9" />
                                <line x1="3" y1="15" x2="21" y2="15" />
                            </svg>
                        </div>
                        <h3>Canaux personnalisables</h3>
                        <p>Activez ou désactivez la protection selon vos besoins pour chaque canal (Réseaux sociaux, E-mails, Web).</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                <line x1="4" y1="22" x2="4" y2="15" />
                            </svg>
                        </div>
                        <h3>Gestion des faux positifs</h3>
                        <p>Un site sûr a été bloqué ? Signalez-le en un clic et recevez un accusé de réception après vérification.</p>
                    </div>
                </div>
            </section>

            {/* Suivi et Historique */}
            <section className="suivi-section">
                <div className="suivi-content">
                    <div className="suivi-left">
                        <h2>Suivi et Historique</h2>
                        <p>Gardez le contrôle sur votre activité numérique grâce à un tableau de bord complet</p>

                        <div className="suivi-features">
                            <div className="suivi-feature">
                                <svg className="suivi-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <div className="suivi-feature-text">
                                    <h4>Historique détaillé</h4>
                                    <p>Retrouvez tous les liens analysés avec leur date, statut et niveau de risque.</p>
                                </div>
                            </div>

                            <div className="suivi-feature">
                                <svg className="suivi-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <div className="suivi-feature-text">
                                    <h4>Filtres avancés</h4>
                                    <p>Triez votre historique par période ou par niveau de gravité (sûr, suspect, dangereux).</p>
                                </div>
                            </div>

                            <div className="suivi-feature">
                                <svg className="suivi-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <div className="suivi-feature-text">
                                    <h4>Journal des blocages</h4>
                                    <p>Accédez à une liste dédiée contenant uniquement les menaces qui ont été stoppées</p>
                                </div>
                            </div>

                            <div className="suivi-feature">
                                <svg className="suivi-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <div className="suivi-feature-text">
                                    <h4>Statistiques globales</h4>
                                    <p>Visualisez des graphiques sur le volume des liens analysés et les types de menaces évitées.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="suivi-right">
                        <div className="suivi-mockup">
                            <div className="mockup-cards">
                                <div className="mockup-card gray"></div>
                                <div className="mockup-card peach"></div>
                            </div>
                            <div className="mockup-lines">
                                <div className="mockup-line"></div>
                                <div className="mockup-line short"></div>
                            </div>
                            <div className="mockup-row">
                                <div className="mockup-button"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guide Éducatifs */}
            <section className="guide-section">
                <div className="guide-header">
                    <div className="guide-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        </svg>
                    </div>
                    <h2>Guides éducatifs disponibles</h2>
                    <p>Explorez les mini-guides AegisScan pour renforcer vos réflexes de cybersécurité avant chaque clic</p>
                </div>

                <div className="guide-grid">
                    <div className="guide-card">
                        <h3>Reconnaître un lien de phishing</h3>
                        <p>Apprenez à identifier les signaux d'alerte dans les messages, e-mails et réseaux sociaux.</p>
                    </div>

                    <div className="guide-card">
                        <h3>Sécuriser ses comptes en ligne</h3>
                        <p>Mots de passe, double facteur, bonnes pratiques pour protéger vos accès sensibles.</p>
                    </div>

                    <div className="guide-card">
                        <h3>Adopter les bons réflexes sur mobile</h3>
                        <p>Réagir face aux SMS suspects, QR codes malveillants et applications douteuses</p>
                    </div>

                    <div className="guide-card">
                        <h3>Analyser un lien avec AegisScan</h3>
                        <p>Comprendre comment fonctionne l'analyse pré-clic et interpréter les résultats.</p>
                    </div>

                    <div className="guide-card">
                        <h3>Éviter les arnaques sur les réseaux sociaux</h3>
                        <p>Identifier les campagnes frauduleuses et protéger votre profil contre les usurpations.</p>
                    </div>

                    <div className="guide-card">
                        <h3>Les bons réflexes au quotidien</h3>
                        <p>Une checklist simple pour réduire les risques à chaque utilisation d'un lien.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <h2>Votre sécurité commence ici</h2>
                <p>Rejoignez AegisScan et prenez le contrôle de votre protection en ligne dès aujourd'hui.</p>
                <button className="cta-button">Télécharger maintenant</button>
            </section>

            {/* Footer */}
            <footer className="features-footer">
                <p>© 2026 AegisScan. Tous droits réservés</p>
            </footer>
        </div>
    )
}