"use client"

import "./privacy-policy.css"

export default function PrivacyPolicy() {
    return (
        <div className="privacy-container">
            <div className="privacy-content">
                <h1 className="privacy-title">Politique de confidentialité – AegisScan</h1>

                <p className="privacy-intro">
                    AegisScan accorde une importance primordiale à la protection de votre vie privée et de vos
                    données personnelles. Cette politique de confidentialité explique quelles informations sont
                    collectées, comment elles sont utilisées et quels sont vos droits.
                </p>

                {/* Section 1 */}
                <section className="privacy-section">
                    <h2 className="section-title">1. Données collectées</h2>
                    <p className="section-text">AegisScan peut collecter les types de données suivants :</p>
                    <ul className="privacy-list">
                        <li>Données d'utilisation : interactions avec l'application, progression dans les cours, résultats aux quiz.</li>
                        <li>Données techniques : type d'appareil, système d'exploitation, version de l'application.</li>
                        <li>Données fournies volontairement : adresse e-mail (si création de compte ou contact).</li>
                    </ul>
                    <p className="note-text">
                        AegisScan ne collecte pas de données sensibles sans votre consentement explicite.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="privacy-section">
                    <h2 className="section-title">2. Utilisation des données</h2>
                    <p className="section-text">Vos données sont utilisées uniquement pour :</p>
                    <ul className="privacy-list">
                        <li>Assurer le bon fonctionnement de l'application</li>
                        <li>Améliorer l'expérience utilisateur</li>
                        <li>Afficher votre progression et vos badges</li>
                        <li>Garantir la sécurité de l'application</li>
                        <li>Communiquer avec vous si nécessaire</li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className="privacy-section">
                    <h2 className="section-title">3. Partage des données</h2>
                    <p className="section-text">
                        AegisScan ne vend, ne loue et ne partage aucune donnée personnelle avec des tiers, sauf
                        obligation légale ou nécessité technique liée au fonctionnement du service.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="privacy-section">
                    <h2 className="section-title">4. Sécurité des données</h2>
                    <p className="section-text">
                        Nous mettons en œuvre des mesures techniques et organisationnelles afin de protéger vos
                        données contre tout accès non autorisé, perte ou altération.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="privacy-section">
                    <h2 className="section-title">5. Conservation des données</h2>
                    <p className="section-text">
                        Les données sont conservées uniquement pendant la durée nécessaire à l'utilisation de
                        l'application ou conformément aux obligations légales.
                    </p>
                </section>

                {/* Section 6 */}
                <section className="privacy-section">
                    <h2 className="section-title">6. Vos droits</h2>
                    <p className="section-text">
                        Conformément à la réglementation en vigueur (RGPD), vous disposez des droits suivants :
                    </p>
                    <ul className="privacy-list">
                        <li>Droit d'accès à vos données</li>
                        <li>Droit de rectification</li>
                        <li>Droit de suppression</li>
                        <li>Droit d'opposition et de limitation</li>
                    </ul>
                    <div className="email-container">
                        <span className="text">Vous pouvez exercer ces droits en nous contactant à l'adresse suivante :</span>
                        <svg className="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <a href="mailto:contact@aegisscan.com" className="email-link">contact@aegisscan.com</a>
                    </div>
                </section>

                {/* Section 7 */}
                <section className="privacy-section">
                    <h2 className="section-title">7. Cookies et technologies similaires</h2>
                    <p className="section-text">
                        AegisScan peut utiliser des technologies similaires aux cookies uniquement à des fins de
                        fonctionnement et d'amélioration de l'application.
                    </p>
                </section>

                {/* Section 8 */}
                <section className="privacy-section">
                    <h2 className="section-title">8. Modifications de la politique</h2>
                    <p className="section-text">
                        Cette politique de confidentialité peut être mise à jour à tout moment. Toute modification sera
                        publiée directement dans l'application.
                    </p>
                </section>

                {/* Section 9 */}
                <section className="privacy-section">
                    <h2 className="section-title">9. Contact</h2>
                    <p className="section-text">
                        Pour toute question concernant cette politique de confidentialité ou vos données personnelles,
                        vous pouvez nous contacter à :
                    </p>
                    <div className="email-container">
                        <svg className="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <a href="mailto:contact@aegisscan.com" className="email-link">contact@aegisscan.com</a>
                    </div>
                </section>

                {/* Back button */}
                <div className="back-button-container">
                    <button className="back-button" type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Retour
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="privacy-footer">
                <p>@ 2026 AegisScan. Tous droits réservés</p>
                <a href="#">Politique de confidentialité</a>
            </footer>
        </div>
    )
}
