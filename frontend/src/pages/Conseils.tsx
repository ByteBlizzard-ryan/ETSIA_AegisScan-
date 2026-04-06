import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from "../components/MainLayout";
import { 
  Clock, BookOpen, Lock, AlertTriangle, Globe, 
  Link as LinkIcon, Mail, List, ChevronRight, 
  BrainCircuit, BarChart3 
} from 'lucide-react';

// --- INTERFACES ---
interface ModuleEducatif {
  id_module: string;
  titre: string;
  description: string;
  contenu: string;
  niveau: string;
  duree_estimee: number;
  acces_premium_only: boolean;
  url_image: string;
}

interface Quiz {
  id_quiz: string;
  titre: string;
  description: string | null;
  nb_questions: number;
  duree: number;
  points_max: number;
}

const Conseils: React.FC = () => {
  const [modules, setModules] = useState<ModuleEducatif[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();

  // --- LOGIQUE DE NAVIGATION (LES 2 BOUTONS) ---
  const NavButtons = () => {
    const isProgression = location.pathname.includes('progression');
    const isConseils = location.pathname.includes('conseils') || location.pathname === '/';

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

        {/* Bouton Statistiques (Graphique) */}
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

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/modules-educatifs').then(res => res.json()),
      fetch('http://localhost:3000/quizzes').then(res => res.json())
    ])
      .then(([modulesData, quizzesData]) => {
        setModules(modulesData);
        setQuizzes(quizzesData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
        setLoading(false);
      });
  }, []);

  const getQuizIcon = (title: string) => {
    if (title.toLowerCase().includes('email')) return <Mail size={20} />;
    if (title.toLowerCase().includes('phishing') || title.toLowerCase().includes('lien')) return <LinkIcon size={20} />;
    return <Globe size={20} />;
  };

  if (loading) return <div className="p-20 text-center font-bold text-gray-400">Chargement de votre parcours...</div>;

  return (
    <MainLayout title="Mon Apprentissage" subtitle="Renforcez vos connaissances en cybersécurité.">
      
      {/* --- EN-TÊTE AVEC TITRE ET BOUTONS À DROITE --- */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">Modules de formation</h2>
        
        {/* Affichage des boutons de switch */}
        <NavButtons />
      </div>

      {isError && (
        <div className="flex items-center gap-2 p-4 mb-6 text-red-700 bg-red-50 rounded-xl border border-red-100">
          <AlertTriangle size={20} />
          <span>Erreur de connexion avec le serveur.</span>
        </div>
      )}

      {/* SECTION MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {modules.map((module) => (
          <div key={module.id_module} className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="relative h-44 bg-slate-50 rounded-t-2xl overflow-hidden">
              {module.url_image ? (
                <img src={module.url_image} alt={module.titre} className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300"><BookOpen size={48} /></div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded uppercase font-mono">
                  {module.niveau}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={14} /> {module.duree_estimee} min
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-800">{module.titre}</h3>
              <p className="mb-6 text-sm text-gray-500 line-clamp-2">{module.description}</p>
              <button 
                onClick={() => navigate(`/article/${module.id_module}`)}
                className="w-full py-3 bg-[#1A365D] text-white text-sm font-bold rounded-xl hover:bg-[#254a7c] transition-colors mt-auto"
              >
                Accéder au module
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION QUIZ */}
      <section className="mt-10">
        <div className="flex items-center gap-3 mb-8">
            <List className="text-[#1A365D]" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Tester mes connaissances</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id_quiz} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 text-[#1A365D] rounded-xl">
                  {getQuizIcon(quiz.titre)}
                </div>
                <h3 className="text-sm font-bold text-gray-800">{quiz.titre}</h3>
              </div>
              <div className="flex gap-4 mb-6 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1"><List size={14}/> {quiz.nb_questions} Qs</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {quiz.duree} min</span>
              </div>
              <button 
                onClick={() => navigate(`/quiz/${quiz.id_quiz}`)}
                className="w-full py-2.5 border-2 border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white text-xs font-bold rounded-xl transition-all"
              >
                Démarrer le quiz
              </button>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Conseils;