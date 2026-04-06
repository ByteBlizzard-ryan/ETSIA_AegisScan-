"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { 
  ShieldCheck, 
  Database, 
  Eye, 
  UserCheck, 
  Lock, 
  Mail, 
  ArrowLeft,
  ChevronRight,
  ShieldAlert
} from "lucide-react"

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    // --- COULEURS RÉCUPÉRÉES DE TON DASHBOARD ---
    const colors = {
        primary: "#1A365D",
        accent: "#1a9a7a",
        statIcon: "#4a8a9a",
        bg: "#f8fafc",
        textMain: "#2d3748",
        textSecondary: "#4a5568",
        border: "#e2e8f0"
    };

    const styles = {
        container: {
            backgroundColor: colors.bg,
            minHeight: "100vh",
            padding: "40px 20px",
            fontFamily: "'Inter', system-ui, sans-serif",
            color: colors.textMain
        },
        card: {
            maxWidth: "850px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
            border: `1px solid ${colors.border}`
        },
        header: {
            textAlign: "center" as const,
            padding: "60px 40px",
            borderBottom: `1px solid ${colors.border}`,
            background: `linear-gradient(135deg, #ffffff 0%, #edf2f7 100%)`
        },
        section: {
            padding: "40px",
            borderBottom: `1px solid ${colors.border}`
        },
        sectionTitle: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "1.25rem",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "20px"
        },
        highlightBox: {
            backgroundColor: "#f0fff4", // Vert très clair pour la confiance
            padding: "24px",
            borderRadius: "12px",
            borderLeft: `4px solid ${colors.accent}`,
            marginTop: "20px"
        },
        backButton: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            color: colors.textSecondary,
            cursor: "pointer",
            fontWeight: "600",
            marginBottom: "24px",
            transition: "all 0.2s"
        },
        badge: {
            backgroundColor: colors.accent,
            color: "white",
            padding: "4px 12px",
            borderRadius: "99px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em"
        }
    }

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: "850px", margin: "0 auto" }}>
                
                <button 
                    onClick={() => navigate(-1)} 
                    style={styles.backButton}
                    onMouseOver={(e) => (e.currentTarget.style.color = colors.primary)}
                    onMouseOut={(e) => (e.currentTarget.style.color = colors.textSecondary)}
                >
                    <ArrowLeft size={18} /> Retour au Dashboard
                </button>

                <div style={styles.card}>
                    {/* Header stylisé comme ton Dashboard */}
                    <header style={styles.header}>
                        <div style={{ 
                            backgroundColor: "white", 
                            width: "80px", 
                            height: "80px", 
                            borderRadius: "20px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            margin: "0 auto 24px",
                            color: colors.accent,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}>
                            <ShieldCheck size={40} />
                        </div>
                        <span style={styles.badge}>Sécurité Certifiée</span>
                        <h1 style={{ fontSize: "2.25rem", fontWeight: "800", color: colors.primary, marginTop: "16px", marginBottom: "8px" }}>
                            Politique de confidentialité
                        </h1>
                        <p style={{ color: colors.textSecondary, fontSize: "1rem" }}>AegisScan protège vos données personnelles</p>
                    </header>

                    <main>
                        {/* Section 1 - Données */}
                        <section style={styles.section}>
                            <div style={styles.sectionTitle}>
                                <Database size={24} style={{ color: colors.statIcon }} />
                                <h2>1. Données collectées</h2>
                            </div>
                            <p style={{ color: colors.textSecondary, lineHeight: "1.7", marginBottom: "20px" }}>
                                Pour assurer le fonctionnement d'AegisScan et votre protection, nous collectons :
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                {[
                                    { t: "Analyses", d: "Historique des URL vérifiées" },
                                    { t: "Progression", d: "Scores de quiz et badges" },
                                    { t: "Technique", d: "Modèle d'appareil et version" },
                                    { t: "Compte", d: "Email pour la synchronisation" }
                                ].map((item, i) => (
                                    <div key={i} style={{ padding: "15px", borderRadius: "10px", border: `1px solid ${colors.border}`, display: "flex", gap: "10px" }}>
                                        <ChevronRight size={16} style={{ color: colors.accent, flexShrink: 0 }} />
                                        <div>
                                            <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{item.t}</div>
                                            <div style={{ fontSize: "0.8rem", color: colors.textSecondary }}>{item.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 2 - Utilisation */}
                        <section style={styles.section}>
                            <div style={styles.sectionTitle}>
                                <Eye size={24} style={{ color: colors.accent }} />
                                <h2>2. Utilisation des données</h2>
                            </div>
                            <p style={{ color: colors.textSecondary, lineHeight: "1.7" }}>
                                Vos données ne sont jamais vendues. Elles servent exclusivement à :
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
                                {["Bloquer les liens malveillants", "Générer vos statistiques de sécurité", "Améliorer nos algorithmes de détection"].map((text, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", color: colors.textSecondary }}>
                                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.accent }}></div>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Section Droits - Mise en avant Vert Aegis */}
                        <section style={styles.section}>
                            <div style={styles.sectionTitle}>
                                <UserCheck size={24} style={{ color: colors.primary }} />
                                <h2>3. Vos Droits & RGPD</h2>
                            </div>
                            <div style={styles.highlightBox}>
                                <p style={{ margin: 0, color: colors.primary, fontWeight: "600" }}>
                                    Conformément au RGPD, vous gardez le contrôle total : droit d'accès, de rectification et suppression de compte instantanée.
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "15px" }}>
                                    <div style={{ backgroundColor: colors.primary, color: "white", padding: "8px", borderRadius: "8px" }}>
                                        <Mail size={18} />
                                    </div>
                                    <a href="mailto:contact@aegisscan.com" style={{ color: colors.primary, fontWeight: "800", textDecoration: "none", borderBottom: `2px solid ${colors.accent}` }}>
                                        contact@aegisscan.com
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Section Sécurité */}
                        <section style={{ ...styles.section, borderBottom: "none" }}>
                            <div style={styles.sectionTitle}>
                                <Lock size={24} style={{ color: colors.accent }} />
                                <h2>4. Sécurité du stockage</h2>
                            </div>
                            <p style={{ color: colors.textSecondary, lineHeight: "1.7", margin: 0 }}>
                                Toutes les analyses effectuées sur le dashboard sont chiffrées. Nous utilisons des serveurs sécurisés pour garantir qu'aucun tiers ne puisse accéder à votre historique de navigation.
                            </p>
                        </section>
                    </main>

                    {/* Footer de la carte */}
                    <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f8fafc", borderTop: `1px solid ${colors.border}` }}>
                        <button 
                            onClick={() => navigate(-1)}
                            style={{ 
                                backgroundColor: colors.primary, 
                                color: "white", 
                                padding: "14px 40px", 
                                borderRadius: "12px", 
                                border: "none", 
                                fontWeight: "700", 
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                boxShadow: "0 4px 14px rgba(26, 54, 93, 0.3)"
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            Fermer
                        </button>
                    </div>
                </div>

                <footer style={{ textAlign: "center", padding: "40px", color: colors.textSecondary, fontSize: "0.85rem" }}>
                    <p>© 2026 AegisScan • Protection des données de bout en bout</p>
                </footer>
            </div>
        </div>
    )
}