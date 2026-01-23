"use client"

import "./landing.css"

export default function Landing() {
    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="header-logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span>AegisScan</span>
                </div>
                <nav className="header-nav">
                    <a href="#">Accueil</a>
                    <a href="#">Fonctionnalités</a>
                </nav>
                <button className="header-btn">Telechargez AegisScan</button>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">
                    Sécurisez votre navigation avec une analyse proactive
                </h1>
                <p className="hero-subtitle">
                    AegisScan intercepte, analyse et bloque les liens malveillans avant que vous ne
                    cliquez. Protegez-vous contre le phishing et les cybermenaces en temps reel.
                </p>

                {/* Analysis Box */}
                <div className="analysis-box">
                    <div className="analysis-input-container">
                        <div className="analysis-input-wrapper">
                            <input
                                type="text"
                                placeholder="Collez ici un lien pour lancer une analyse ..."
                                readOnly
                            />
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </div>
                        <button className="analyze-btn">Analyser</button>
                    </div>
                </div>

                {/* Result Box */}
                <div className="result-box">
                    <div className="result-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <div className="result-content">
                        <p className="result-title">{"Résultat de l'analyse du lien"}</p>
                        <p className="result-text">
                            Exemple : https://exemple.com est considéré comme <strong>SÛR</strong>
                        </p>
                    </div>
                </div>

                <button className="download-btn">Telecharger gratuitement</button>
            </section>

            {/* How It Works Section */}
            <section className="how-section">
                <h2 className="section-title">Comment AegisScan vous protège</h2>

                <div className="steps-container">
                    {/* Step 1 */}
                    <div className="step-card">
                        <div className="step-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="step-title">Interception</h3>
                        <p className="step-desc">Les liens sont analysé avant meme votre clic</p>
                    </div>

                    <div className="step-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card">
                        <div className="step-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                                <path d="M16 16l2 2" />
                                <path d="M8 16l-2 2" />
                            </svg>
                        </div>
                        <h3 className="step-title">Analyse</h3>
                        <p className="step-desc">Detection avancee des menaces en temps reel.</p>
                    </div>

                    <div className="step-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card">
                        <div className="step-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M15 9l-6 6" />
                                <path d="M9 9l6 6" />
                            </svg>
                        </div>
                        <h3 className="step-title">Blocage</h3>
                        <p className="step-desc">Acces immediat aux sites dangereux bloque.</p>
                    </div>
                </div>
            </section>

            {/* Why Section */}
            <section className="why-section">
                <h2 className="section-title">Pourquoi choisir AegisScan ?</h2>
                <p className="why-subtitle">{"Des outils puissants pour une tranquilite d'esprit totale"}</p>

                <div className="features-container">
                    {/* Feature 1 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Analyse en temps reel</h3>
                        <p className="feature-desc">
                            Aucune latence perceptible. Vos liens sont vérifiés instantanément sans ralentir votre navigation.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                <path d="M12 6v7" />
                                <path d="M8 9l4-3 4 3" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Education continu</h3>
                        <p className="feature-desc">
                            Apprenez a reconnaitre les menaces grace a nos conseils contextuels et nos mini-guides
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                <line x1="12" y1="18" x2="12" y2="18" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Multiplateforme</h3>
                        <p className="feature-desc">
                            Protegez vos e-mails, reseaux sociaux et messages, que vous soyez sur mobile ou ordinateur
                        </p>
                    </div>
                </div>

                <button className="features-link-btn">Voir toutes les fonctionnalites en detail</button>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2 className="cta-title">Pret a proteger votre vie numerique ?</h2>
                <button className="cta-btn">Telecharger maintenant</button>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>@ 2026 AegisScan. Tous droites reserves</p>
            </footer>
        </div>
    )
}
