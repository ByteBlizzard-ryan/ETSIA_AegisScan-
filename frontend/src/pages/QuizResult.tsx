import { useState } from "react";

const quizData = {
  score: 3,
  total: 5,
  label: "Excellent travail !",
  questions: [
    {
      id: 3,
      text: 'Vous recevez un SMS semblant provenir de votre opérateur mobile, vous annonçant une "facture impayée" et vous demandant de cliquer sur un lien pour régulariser la situation. Que faites-vous ?',
      answers: [
        {
          text: "Je supprime le SMS et contacte mon opérateur via son site officiel ou son numéro connu.",
          correct: true,
          selected: true,
        },
      ],
    },
    {
      id: 5,
      text: 'Un e-mail prétendument envoyé par votre opérateur téléphonique vous propose une "offre exclusive" en cliquant sur un lien pour en bénéficier. L\'adresse de l\'expéditeur est support@orange-offres.net. Que faites-vous ?',
      answers: [
        {
          text: "Je réponds pour demander si l'offre est valable.",
          correct: false,
          selected: true,
        },
        {
          text: "Je vérifie l'adresse : le domaine orange-offres.net n'est pas officiel, je supprime l'e-mail.",
          correct: true,
          selected: false,
        },
      ],
    },
  ],
};

const CircleProgress = ({ score, total }: { score: number; total: number }) => {
  const percent = (score / total) * 100;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;

  return (
    <div className="circle-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e8edf5" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#1a56db"
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="circle-text">
        <span className="score-num">{score}/{total}</span>
      </div>
    </div>
  );
};

export default function QuizResult() {
  const [view, setView] = useState<"result" | "progress">("result");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Noto+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f0f4fb;
          font-family: 'Noto Sans', sans-serif;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px 80px;
          background: #f0f4fb;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 32px rgba(26,86,219,0.08);
          width: 100%;
          max-width: 720px;
          padding: 48px 40px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        h1 {
          font-family: 'Sora', sans-serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 28px;
          letter-spacing: -0.5px;
        }

        .circle-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          margin-bottom: 16px;
        }

        .circle-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .score-num {
          font-family: 'Sora', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a56db;
        }

        .label {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 36px;
        }

        .questions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .question-block {
          border: 1.5px solid #e5e9f0;
          border-radius: 14px;
          padding: 22px 24px;
          background: #fafbfd;
          text-align: left;
        }

        .question-text {
          font-size: 0.92rem;
          color: #374151;
          line-height: 1.6;
          margin-bottom: 14px;
          font-weight: 500;
        }

        .question-num {
          font-weight: 700;
          color: #1a56db;
        }

        .answer {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.88rem;
          color: #374151;
          line-height: 1.5;
        }

        .icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          font-size: 13px;
        }

        .icon-correct {
          background: #dcfce7;
          color: #16a34a;
        }

        .icon-wrong {
          background: #fee2e2;
          color: #dc2626;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: #e5e9f0;
          margin: 32px 0 28px;
        }

        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .btn {
          padding: 11px 24px;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.18s;
          letter-spacing: 0.01em;
        }

        .btn-primary {
          background: #1a56db;
          color: #fff;
          box-shadow: 0 2px 12px rgba(26,86,219,0.18);
        }

        .btn-primary:hover {
          background: #1648c0;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(26,86,219,0.25);
        }

        .btn-secondary {
          background: #fff;
          color: #374151;
          border: 1.5px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #9ca3af;
          background: #f0f4fb;
          border-top: 1px solid #e5e9f0;
        }

        .footer a {
          color: #6b7280;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        @media (max-width: 520px) {
          .card { padding: 32px 18px 32px; }
          h1 { font-size: 1.3rem; }
          .score-num { font-size: 1.8rem; }
          .actions { flex-direction: column; }
          .btn { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="page">
        <div className="card">
          <h1>Résultat Quiz</h1>

          <CircleProgress score={quizData.score} total={quizData.total} />

          <p className="label">{quizData.label}</p>

          <div className="questions">
            {quizData.questions.map((q) => (
              <div key={q.id} className="question-block">
                <p className="question-text">
                  <span className="question-num">{q.id}. </span>
                  {q.text}
                </p>
                {q.answers.map((a, i) => (
                  <div key={i} className="answer">
                    <span className={`icon ${a.correct ? "icon-correct" : "icon-wrong"}`}>
                      {a.correct ? "✓" : "✗"}
                    </span>
                    <span>{a.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="actions">
            <button className="btn btn-primary" onClick={() => alert("Refaire le quiz !")}>
              Refaire le quiz
            </button>
            <button className="btn btn-secondary" onClick={() => setView("progress")}>
              Voir votre progression
            </button>
            <button className="btn btn-secondary" onClick={() => alert("Retour à l'apprentissage")}>
              Retour à l'apprentissage
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>@ 2026 AegisScan. Tous droits reservés</span>
        <a href="#">Politique de confidentialité</a>
      </footer>
    </>
  );
}
