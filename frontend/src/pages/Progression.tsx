import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Lock, Award, BrainCircuit, BarChart3 } from "lucide-react"; 
import MainLayout from "../components/MainLayout";

export default function ProgressionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  // --- LOGIQUE DE NAVIGATION (LES 2 BOUTONS) ---
  const NavButtons = () => {
    const isProgression = location.pathname.includes('progression');
    const isConseils = location.pathname.includes('conseils');

    return (
      <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
        {/* Bouton Apprentissage (Cerveau) */}
        <button
          onClick={() => navigate('/conseils')}
          className={`p-2 rounded-lg transition-all ${
            isConseils ? 'bg-blue-100 text-[#1A365D]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <BrainCircuit size={24} />
        </button>

        {/* Petit trait de séparation */}
        <div className="w-[1px] h-6 bg-gray-100 mx-1"></div>

        {/* Bouton Statistiques (Graphique) - Actif ici */}
        <button
          onClick={() => navigate('/progression')}
          className={`p-2 rounded-lg transition-all ${
            isProgression ? 'bg-blue-100 text-[#1A365D]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <BarChart3 size={24} />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        // 1. Appel des scores de Quiz
        const resQuiz = await fetch(`http://localhost:3000/stats/quiz`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataQuiz = await resQuiz.json();
        setHistory(dataQuiz.history || []);

        // 2. Appel de TES BADGES RÉELS
        const resBadges = await fetch(`http://localhost:3000/utilisateur/mes-badges`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const dataBadges = await resBadges.json();
        setBadges(dataBadges || []);
        
        console.log("🏆 Données Badges reçues :", dataBadges);

      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [navigate]);

  return (
    <MainLayout title="Mon suivi de Progression">
      
      {/* HEADER AVEC LE SWITCH NAVIGATION */}
      <div className="flex justify-between items-center mb-8 px-8 pt-6 bg-gray-50">
        <div>
          <h2 className="text-2xl font-bold text-gray-800"></h2>
          <p className="text-sm text-gray-500"></p>
        </div>
        
        {/* Les boutons de switch */}
        <NavButtons />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-8 py-6 bg-gray-50 min-h-screen">
        
        {/* SECTION GAUCHE : SCORES */}
        <div className="flex-[2]">
          <h2 className="text-blue-700 font-bold mb-6 flex items-center gap-2">
            <Shield size={20} /> Quiz Complétés
          </h2>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-400 animate-pulse">Chargement de vos scores...</p>
            ) : history.length > 0 ? (
              history.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{item.quiz_titre}</h3>
                        <p className="text-xs text-gray-400 uppercase font-semibold">Tantative terminée le {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className={`text-xl font-black ${item.score_obtenu < (item.total_questions / 2) ? "text-red-500" : "text-blue-600"}`}>
                        {item.score_obtenu}/{item.total_questions}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Score Final</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-10 rounded-2xl border border-dashed border-gray-200 text-center">
                <p className="text-gray-400 italic">Vous n'avez pas encore passé de quiz.</p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION DROITE : BADGES DYNAMIQUES */}
        <div className="flex-1 lg:max-w-[350px]">
          <h2 className="text-blue-700 font-bold mb-6 flex items-center gap-2">
            <Award size={20} /> Mes badges
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <p className="text-gray-400 animate-pulse text-center">Recherche de trophées...</p>
            ) : badges.length > 0 ? (
              badges.map((badge, idx) => (
                <BadgeCard 
                  key={idx}
                  icon={badge.icone} 
                  title={badge.nom_badge} 
                  desc={badge.description}
                  unlocked={true}
                />
              ))
            ) : (
              <div className="opacity-60">
                 <BadgeCard 
                  icon={null} 
                  title="Aucun badge" 
                  desc="Complétez des modules à 100% pour débloquer vos premiers badges !"
                  unlocked={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Composant BadgeCard
function BadgeCard({ icon, title, desc, unlocked }: any) {
  return (
    <div className={`p-6 rounded-2xl border flex flex-col items-center text-center transition-all duration-300 ${unlocked ? 'bg-white border-blue-50 shadow-sm hover:shadow-blue-100 hover:-translate-y-1' : 'bg-gray-100/50 border-gray-200 grayscale'}`}>
      <div className={`mb-4 p-1 rounded-full flex items-center justify-center w-20 h-20 overflow-hidden ${unlocked ? 'bg-gradient-to-br from-blue-50 to-indigo-50 shadow-inner' : 'bg-gray-200'}`}>
        {icon && icon.startsWith('http') ? (
          <img src={icon} alt={title} className="w-full h-full object-contain p-2" />
        ) : (
          <Award className={`${unlocked ? 'text-blue-500' : 'text-gray-400'} w-10 h-10`} />
        )}
      </div>
      <h4 className="font-bold text-gray-900 text-base mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 px-2">{desc}</p>
      {!unlocked ? (
        <span className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase bg-gray-200 px-3 py-1 rounded-full">
          <Lock size={10} /> Verrouillé
        </span>
      ) : (
        <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-3 py-1 rounded-full border border-green-100">
           Débloqué
        </span>
      )}
    </div>
  );
}