import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Quiz {
  id: number;
  title: string;
  score: number;
  total: number;
  date: string;
}

interface Badge {
  id: number;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

// ─── Icons SVG ───────────────────────────────────────────────────────────────
const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IconHistory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconStats = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconTips = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconAccessibility = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><path d="M9 20l3-8m0 0l3 8M12 12l-3-4m3 4l3-4"/>
    <path d="M6 9l6-2 6 2"/>
  </svg>
);
const IconBarChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────
const quizzes: Quiz[] = [
  { id: 1, title: "Reconnaitre un lien phishing",       score: 5, total: 5, date: "24 juin 2025" },
  { id: 2, title: "Bonnes pratiques de navigation",     score: 5, total: 7, date: "29 juin 2025" },
  { id: 3, title: "Email sûr ou dangereux ?",           score: 2, total: 8, date: "24 juin 2025" },
  { id: 4, title: "Mots de passe sécurisés",            score: 4, total: 5, date: "1 juil. 2025" },
  { id: 5, title: "Arnaques sur les réseaux sociaux",   score: 3, total: 6, date: "5 juil. 2025" },
  { id: 6, title: "Sécurité Wi-Fi publique",            score: 6, total: 6, date: "10 juil. 2025" },
  { id: 7, title: "Détecter un faux site web",          score: 5, total: 6, date: "12 juil. 2025" },
  { id: 8, title: "Protection des données personnelles",score: 7, total: 8, date: "15 juil. 2025" },
  { id: 9, title: "Sécurité des applications mobiles",  score: 3, total: 5, date: "18 juil. 2025" },
];

const badges: Badge[] = [
  {
    id: 1,
    icon: "🛡️",
    title: "Détecteur de phishing",
    description: "Vous savez reconnaître et éviter les tentatives de phishing.",
    unlocked: true,
  },
  {
    id: 2,
    icon: "🔗",
    title: "Sentinelle des liens",
    description: "Vous identifiez les liens malveillants et naviguez en sécurité.",
    unlocked: true,
  },
  {
    id: 3,
    icon: "✉️",
    title: "Expert en e-mails sûrs",
    description: "Vous appliquez les bonnes pratiques pour sécuriser vos e-mails.",
    unlocked: false,
  },
  {
    id: 4,
    icon: "🌐",
    title: "Cybercitoyen averti",
    description: "Vous protégez vos données et votre identité sur les réseaux sociaux.",
    unlocked: true,
  },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard",     icon: <IconDashboard /> },
  { id: "historique", label: "Historique",   icon: <IconHistory /> },
  { id: "liens",     label: "Liens bloqués", icon: <IconShield /> },
  { id: "stats",     label: "Statistiques",  icon: <IconStats /> },
  { id: "conseils",  label: "Conseils",      icon: <IconTips /> },
  { id: "profil",    label: "Profil",        icon: <IconUser /> },
  { id: "quitter",   label: "Quitter",       icon: <IconLogout /> },
];

const ITEMS_PER_PAGE = 3;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const scoreColor = (score: number, total: number): string => {
  const pct = score / total;
  if (pct >= 0.8) return "#1a56db";
  if (pct >= 0.5) return "#d97706";
  return "#dc2626";
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Progression() {
  const [active, setActive] = useState<string>("conseils");
  const [page, setPage]     = useState<number>(1);

  const totalPages = Math.ceil(quizzes.length / ITEMS_PER_PAGE);
  const paged      = quizzes.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Noto+Sans:wght@400;500&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body {
          font-family: 'Noto Sans', sans-serif;
          background: #f5f7fb;
          color: #1e293b;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Layout ── */
        .layout {
          display: flex;
          min-height: 100vh;
          flex-direction: column;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 220px;
          background: #fff;
          border-right: 1.5px solid #e2e8f0;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          padding: 28px 0 20px;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 22px 32px;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #0f3460;
          text-decoration: none;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          background: #0f3460;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 18px;
          cursor: pointer;
          border-radius: 10px;
          margin: 2px 10px;
          font-size: 0.9rem;
          color: #475569;
          font-weight: 500;
          transition: all 0.15s;
          border: none;
          background: none;
          width: calc(100% - 20px);
          text-align: left;
          font-family: 'Noto Sans', sans-serif;
        }

        .nav-item:hover  { background: #f1f5f9; color: #1a56db; }
        .nav-item.active { background: #eff6ff; color: #1a56db; font-weight: 600; }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          opacity: 0.85;
        }

        /* ── Main area ── */
        .main {
          margin-left: 220px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .topbar {
          padding: 30px 40px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .page-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: #0f172a;
        }

        .topbar-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          transition: all 0.15s;
          color: #0f3460;
        }

        .icon-btn:hover     { border-color: #1a56db; background: #eff6ff; color: #1a56db; }
        .icon-btn.btn-active { border-color: #1a56db; background: #eff6ff; color: #1a56db; }

        .divider {
          height: 1.5px;
          background: #e2e8f0;
          margin: 20px 40px 0;
        }

        .content {
          padding: 28px 40px 40px;
          display: grid;
          grid-template-columns: 1fr 270px;
          gap: 36px;
          flex: 1;
        }

        /* ── Section title ── */
        .section-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #1a56db;
          margin-bottom: 16px;
        }

        /* ── Quiz cards ── */
        .quiz-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px 22px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: box-shadow 0.15s, border-color 0.15s, transform 0.1s;
        }

        .quiz-card:hover {
          box-shadow: 0 4px 18px rgba(26,86,219,0.09);
          border-color: #bfcfee;
          transform: translateY(-1px);
        }

        .quiz-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .quiz-meta { font-size: 0.84rem; color: #64748b; line-height: 1.6; }
        .quiz-score { font-weight: 700; }

        /* ── Pagination ── */
        .pagination {
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        .page-btn {
          min-width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          cursor: pointer;
          font-size: 0.85rem;
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 12px;
          transition: all 0.15s;
          gap: 4px;
        }

        .page-btn:hover:not(:disabled)      { border-color: #1a56db; color: #1a56db; background: #eff6ff; }
        .page-btn.page-active               { background: #1a56db; border-color: #1a56db; color: #fff; }
        .page-btn:disabled                  { opacity: 0.35; cursor: default; }

        /* ── Badges column ── */
        .badges-col { display: flex; flex-direction: column; }

        .badge-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px 16px;
          margin-bottom: 12px;
          text-align: center;
          transition: box-shadow 0.15s, transform 0.1s;
        }

        .badge-card:hover { box-shadow: 0 4px 16px rgba(26,86,219,0.09); transform: translateY(-1px); }

        .badge-card.badge-unlocked {
          background: #f0f7f0;
          border-color: #a7c4a0;
        }

        .badge-icon   { font-size: 1.7rem; margin-bottom: 8px; line-height: 1; }

        .badge-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f3460;
          margin-bottom: 7px;
        }

        .badge-desc {
          font-size: 0.78rem;
          color: #475569;
          line-height: 1.55;
          text-align: justify;
        }

        .badge-locked-tag {
          display: inline-block;
          margin-top: 8px;
          font-size: 0.7rem;
          background: #f1f5f9;
          color: #94a3b8;
          border-radius: 20px;
          padding: 2px 10px;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        /* ── Footer ── */
        .footer {
          margin-left: 220px;
          padding: 14px 40px;
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          background: #fff;
        }

        .footer a {
          color: #64748b;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sidebar { display: none; }
          .main, .footer { margin-left: 0; }
          .content { grid-template-columns: 1fr; padding: 20px 16px 32px; }
          .topbar  { padding: 20px 16px 0; }
          .divider { margin: 16px 16px 0; }
          .page-title { font-size: 1.3rem; }
        }
      `}</style>

      <div className="layout">

        {/* ════ SIDEBAR ════ */}
        <aside className="sidebar">
          <a href="#" className="logo">
            <div className="logo-icon">🛡</div>
            AegisScan
          </a>

          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* ════ MAIN ════ */}
        <div className="main">

          {/* Topbar */}
          <div className="topbar">
            <h1 className="page-title">Mon suivi de Progression</h1>
            <div className="topbar-actions">
              <button className="icon-btn" title="Accessibilité"><IconAccessibility /></button>
              <button className="icon-btn btn-active" title="Statistiques"><IconBarChart /></button>
            </div>
          </div>

          <div className="divider" />

          {/* Content grid */}
          <div className="content">

            {/* ── Left : Quiz list ── */}
            <div>
              <h2 className="section-title">Quiz Complétés</h2>

              {paged.map((q) => (
                <div key={q.id} className="quiz-card">
                  <div className="quiz-title">{q.title}</div>
                  <div className="quiz-meta">
                    Score :{" "}
                    <span
                      className="quiz-score"
                      style={{ color: scoreColor(q.score, q.total) }}
                    >
                      {q.score}/{q.total}
                    </span>
                  </div>
                  <div className="quiz-meta">{q.date}</div>
                </div>
              ))}

              {/* Pagination */}
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ‹ Précédent
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`page-btn ${page === n ? "page-active" : ""}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}

                <button
                  className="page-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Suivant ›
                </button>
              </div>
            </div>

            {/* ── Right : Badges ── */}
            <div className="badges-col">
              <h2 className="section-title">Mes badges</h2>

              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`badge-card ${b.unlocked ? "badge-unlocked" : ""}`}
                >
                  <div className="badge-icon">{b.icon}</div>
                  <div className="badge-title">{b.title}</div>
                  <p className="badge-desc">{b.description}</p>
                  {!b.unlocked && <span className="badge-locked-tag">🔒 Non débloqué</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ FOOTER ════ */}
        <footer className="footer">
          <span>@ 2026 AegisScan. Tous droits reservés</span>
          <a href="#">Politique de confidentialité</a>
        </footer>

      </div>
    </>
  );
}
