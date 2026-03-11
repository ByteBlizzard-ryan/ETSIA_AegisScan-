import { useState } from "react";

// ─── Shield Block Icon ────────────────────────────────────────────────────────
const IconShieldBlock = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <path
      d="M36 4L8 16v20c0 17.6 12.2 34 28 38 15.8-4 28-20.4 28-38V16L36 4z"
      fill="#e53e3e"
      opacity="0.15"
    />
    <path
      d="M36 8L10 19.2V36c0 15.8 10.8 30.6 26 34.4C51.2 66.6 62 51.8 62 36V19.2L36 8z"
      fill="none"
      stroke="#e53e3e"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <circle cx="36" cy="36" r="12" stroke="#e53e3e" strokeWidth="3" fill="none"/>
    <line x1="27.5" y1="27.5" x2="44.5" y2="44.5" stroke="#e53e3e" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// ─── Risk badge colors ────────────────────────────────────────────────────────
const riskConfig: Record<string, { bg: string; color: string; label: string }> = {
  eleve:  { bg: "#e53e3e", color: "#fff",     label: "Élevé"  },
  moyen:  { bg: "#d97706", color: "#fff",     label: "Moyen"  },
  faible: { bg: "#16a34a", color: "#fff",     label: "Faible" },
};

// ─── Props (facultatif pour usage dynamique) ──────────────────────────────────
interface LienBloqueProps {
  threatType?: string;
  riskLevel?:  "eleve" | "moyen" | "faible";
  onClose?:    () => void;
  onReport?:   () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function LienBloque({
  threatType = "Phishing",
  riskLevel  = "eleve",
  onClose,
  onReport,
}: LienBloqueProps) {
  const [reported, setReported] = useState(false);
  const [closed,   setClosed]   = useState(false);

  const risk = riskConfig[riskLevel] ?? riskConfig.eleve;

  const handleClose = () => {
    setClosed(true);
    onClose?.();
  };

  const handleReport = () => {
    setReported(true);
    onReport?.();
  };

  if (closed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        body {
          font-family: 'Noto Sans', sans-serif;
          background: #e8ecf2;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Overlay backdrop (si utilisé en modal) ── */
        .backdrop {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #e8ecf2;
        }

        /* ── Card ── */
        .card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
          width: 100%;
          max-width: 420px;
          padding: 40px 36px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: fadeUp 0.35s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── Icon ── */
        .icon-wrap {
          margin-bottom: 18px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }

        /* ── Title ── */
        .title {
          font-family: 'Sora', sans-serif;
          font-size: 1.9rem;
          font-weight: 800;
          color: #e53e3e;
          margin-bottom: 14px;
          letter-spacing: -0.5px;
        }

        /* ── Description ── */
        .description {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.65;
          margin-bottom: 28px;
          max-width: 320px;
        }

        .unsafe-link {
          color: #1a56db;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
          transition: color 0.15s;
        }

        .unsafe-link:hover { color: #1648c0; }

        /* ── Divider ── */
        .divider {
          width: 100%;
          height: 1px;
          background: #e5e9f0;
          margin-bottom: 22px;
        }

        /* ── Info rows ── */
        .info-table {
          width: 100%;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid #f1f5f9;
        }

        .info-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-label {
          font-size: 0.92rem;
          color: #374151;
          font-weight: 500;
        }

        .info-value {
          font-size: 0.92rem;
          font-weight: 700;
          color: #111827;
        }

        /* ── Risk badge ── */
        .risk-badge {
          display: inline-block;
          padding: 4px 18px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          letter-spacing: 0.02em;
        }

        /* ── Divider 2 ── */
        .divider2 {
          width: 100%;
          height: 1px;
          background: #e5e9f0;
          margin-bottom: 24px;
        }

        /* ── Buttons ── */
        .btn-close {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          background: #0f3460;
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.18s;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 16px rgba(15,52,96,0.18);
        }

        .btn-close:hover {
          background: #1a56db;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,86,219,0.25);
        }

        .btn-close:active { transform: translateY(0); }

        /* ── Report link ── */
        .btn-report {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #374151;
          text-decoration: none;
          transition: color 0.15s;
          padding: 4px 0;
        }

        .btn-report:hover   { color: #1a56db; }
        .btn-report.done    { color: #16a34a; cursor: default; }

        /* ── Success toast ── */
        .toast {
          margin-top: 14px;
          padding: 10px 18px;
          background: #dcfce7;
          color: #166534;
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 600;
          border: 1px solid #bbf7d0;
          width: 100%;
          text-align: center;
        }

        @media (max-width: 480px) {
          .card { padding: 32px 20px 28px; border-radius: 18px; }
          .title { font-size: 1.6rem; }
        }
      `}</style>

      <div className="backdrop">
        <div className="card">

          {/* Icon */}
          <div className="icon-wrap">
            <IconShieldBlock />
          </div>

          {/* Title */}
          <h1 className="title">Lien Bloqué</h1>

          {/* Description */}
          <p className="description">
            AegisScan a détecté et bloqué l'accès à ce lien pour votre sécurité.
            Il contient potentiellement du contenu malveillant.{" "}
            <span className="unsafe-link">Accès non sécurisé au site</span>.
          </p>

          <div className="divider" />

          {/* Info table */}
          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Type de menace</span>
              <span className="info-value">{threatType}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Niveau de risque</span>
              <span
                className="risk-badge"
                style={{ background: risk.bg, color: risk.color }}
              >
                {risk.label}
              </span>
            </div>
          </div>

          <div className="divider2" />

          {/* Close button */}
          <button className="btn-close" onClick={handleClose}>
            Fermer
          </button>

          {/* Report */}
          <button
            className={`btn-report ${reported ? "done" : ""}`}
            onClick={handleReport}
            disabled={reported}
          >
            {reported ? "✓ Signalement envoyé" : "Signaler faux positif"}
          </button>

          {reported && (
            <div className="toast">
              Merci ! Votre signalement a bien été pris en compte.
            </div>
          )}

        </div>
      </div>
    </>
  );
}
