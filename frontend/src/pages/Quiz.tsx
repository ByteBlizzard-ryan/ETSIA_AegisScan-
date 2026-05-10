import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, AlertCircle, XCircle, Info } from "lucide-react";
import MainLayout from "../components/MainLayout";

// Interfaces correspondant à tes entités NestJS
interface ReponsePossible {
  id_reponse: string;
  texte: string;
  est_correcte: boolean; // Ajouté pour le feedback visuel
}

interface Question {
  id_question: string;
  texte: string;
  explication_reponse: string;
  reponses_possibles: ReponsePossible[];
}

interface QuizData {
  id_quiz: string;
  titre: string;
  questions: Question[];
}

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- ÉTATS ---
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- CHARGEMENT ---
  useEffect(() => {
    fetch(`http://localhost:3000/quizzes/${id}/details`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading || !quiz) return <div className="p-20 text-center">Chargement...</div>;

  const currentQuestion = quiz.questions[currentStep];
  const selectedReponseId = selectedAnswers[currentQuestion.id_question];
  const reponseChoisie = currentQuestion.reponses_possibles.find(r => r.id_reponse === selectedReponseId);
  const isCorrect = reponseChoisie?.est_correcte;

  // --- ACTIONS ---
  const handleSelect = (reponseId: string) => {
    if (!showFeedback) {
      setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id_question]: reponseId }));
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setCurrentStep(s => s + 1);
  };

  const handleFinish = async () => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    if (!userId) return alert("Veuillez vous connecter.");

    const payload = {
      id_utilisateur: userId,
      reponses: Object.entries(selectedAnswers).map(([qId, rId]) => ({
        id_question: qId,
        id_reponse_choisie: rId
      }))
    };

    try {
      const res = await fetch('http://localhost:3000/quizzes/submit', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) setIsFinished(true);
    } catch (err) {
      alert("Erreur lors de l'envoi.");
    }
  };

  return (
    <MainLayout title={quiz.titre} subtitle={`Question ${currentStep + 1} sur ${quiz.questions.length}`}>
      <div className="max-w-3xl mx-auto mb-10">
        
        {!isFinished ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            
            {/* Barre de progression */}
            <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
              <div 
                className="bg-[#1a9a7a] h-2 rounded-full transition-all duration-500" 
                style={{ width: `${((currentStep + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 mb-8">{currentQuestion.texte}</h2>

            {/* Réponses */}
            <div className="space-y-4 mb-8">
              {currentQuestion.reponses_possibles.map((resp) => {
                const isSelected = selectedReponseId === resp.id_reponse;
                
                // Style dynamique si feedback activé
                let buttonStyle = "border-gray-200 text-gray-700 hover:border-[#1a9a7a]";
                if (isSelected && !showFeedback) buttonStyle = "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100";
                if (showFeedback) {
                   if (resp.est_correcte) buttonStyle = "border-green-500 bg-green-50 text-green-700";
                   else if (isSelected && !resp.est_correcte) buttonStyle = "border-red-500 bg-red-50 text-red-700";
                   else buttonStyle = "border-gray-100 text-gray-400 opacity-50";
                }

                return (
                  <button
                    key={resp.id_reponse}
                    disabled={showFeedback}
                    onClick={() => handleSelect(resp.id_reponse)}
                    className={`w-full text-left p-5 rounded-2xl border-2 font-semibold transition-all flex items-center justify-between ${buttonStyle}`}
                  >
                    {resp.texte}
                    {showFeedback && resp.est_correcte && <Check size={20} className="text-green-600" />}
                    {showFeedback && isSelected && !resp.est_correcte && <XCircle size={20} className="text-red-600" />}
                  </button>
                );
              })}
            </div>

            {/* Bloc Explication (Feedback) */}
            {showFeedback && (
              <div className={`p-6 rounded-2xl mb-8 animate-in slide-in-from-top-2 duration-300 border-l-4 ${isCorrect ? "bg-green-50 border-green-500 text-green-800" : "bg-red-50 border-red-500 text-red-800"}`}>
                <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-wider text-xs">
                   {isCorrect ? <Check size={16}/> : <AlertCircle size={16}/>}
                   {isCorrect ? "C'est une excellente réponse !" : "Dommage, ce n'est pas tout à fait ça..."}
                </div>
                <p className="text-sm leading-relaxed italic">"{currentQuestion.explication_reponse}"</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end pt-6 border-t border-gray-50">
              {!showFeedback ? (
                <button
                  disabled={!selectedReponseId}
                  onClick={() => setShowFeedback(true)}
                  className="px-10 py-4 bg-[#1a9a7a] text-white rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                >
                  Vérifier ma réponse
                </button>
              ) : (
                currentStep < quiz.questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-10 py-4 bg-[#1a9a7a] text-white rounded-2xl font-bold shadow-lg transition-all"
                  >
                    Question suivante <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-12 py-4 bg-[#1a9a7a] text-white rounded-2xl font-bold shadow-lg hover:bg-green-700 transition-all"
                  >
                    Terminer le quiz
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          /* Écran de succès */
          <div className="text-center bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-4">Quiz terminé !</h2>
            <p className="text-gray-500 mb-10 italic">Vos statistiques ont été mises à jour dans votre tableau de bord.</p>
            <button 
              onClick={() => navigate('/progression')}
              className="w-full py-5 bg-[#1A365D] text-white rounded-2xl font-bold shadow-xl transition-all"
            >
              Voir mon score
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}