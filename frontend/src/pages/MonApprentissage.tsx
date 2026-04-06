import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import Lock from '../assets/logo.png';
import Ordi from '../assets/logo.png';
import Mailimg from '../assets/logo.png';
import Users from '../assets/logo.png';
import {
  Shield,
  BarChart3,
  Info,
  User,
  LogOut,
  Clock,
  List,
  Link as LinkIcon,
  Globe,
  Mail,
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'Debutant' | 'Intermediaire';
  icon: React.ReactNode;
  image?: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: number;
  duration: number;
  icon: React.ReactNode;
}

const MonApprentissage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const learningModules: LearningModule[] = [
    {
      id: 'phishing',
      title: "Qu'est-ce que le Phishing ?",
      description: 'Découvrez les bases des attaques par hameçonnage et comment les reconnaître.',
      level: 'Debutant',
      icon: <img src={Lock} alt="lock"className='w-full h-full object-cover' />
    },
    {
      id: 'malicious-links',
      title: 'Identifier les Liens Malveillants',
      description: 'Apprenez à repérer les URL suspecieuses avant de cliquer.',
      level: 'Intermediaire',
      icon: <img src={Ordi} alt="ordi" className='w-full h-full object-cover'  />
    },
    {
      id: 'email-security',
      title: 'Bonnes Pratiques E-mail',
      description: 'Conseils essentiels pour sécuriser votre boîte de réception contre les menaces.',
      level: 'Debutant',
      icon: <img src={Mailimg} alt="mail" className='w-full h-full object-cover'/>
    },
    {
      id: 'social-media',
      title: 'Securite sur les reseaux sociaux',
      description: 'Protegez votre vie privée et vos données sur les plateformes sociales.',
      level: 'Intermediaire',
      icon: <img src={Users} alt="users" className='w-full h-full object-cover'/>
    }
  ];

  const quizzes: Quiz[] = [
    {
      id: 'phishing-quiz',
      title: 'Reconnaitre un lien phishing',
      questions: 5,
      duration: 5,
      icon: <LinkIcon className="w-6 h-6" />
    },
    {
      id: 'email-quiz',
      title: 'Email sûr ou dangeureux ?',
      questions: 8,
      duration: 10,
      icon: <Mail className="w-6 h-6" />
    },
    {
      id: 'navigation-quiz',
      title: 'Bonnes pratiques de navigation',
      questions: 7,
      duration: 7,
      icon: <Globe className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-60 bg-white shadow-xl border-r border-slate-200 z-50">
        <div className="flex items-center gap-1 p-6 border-b border-slate-200">
         <img src={Logo} alt="Logo" className="h-14 w-auto mx-auto mt-4" />
         <span className="text-2xl font-bold text-slate-800">AegisScan</span>
       </div>

  <nav className="p-4 space-y-1">
    <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <BarChart3 className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <Clock className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="font-medium">Historique</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <Shield className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="font-medium">Liens bloques</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <BarChart3 className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="font-medium">Statistiques</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md shadow-blue-200"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Conseils</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <User className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            <span className="font-medium">Profil</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-slate-600 group-hover:text-red-600" />
            <span className="font-medium">Quitter</span>
          </a>


  </nav>
</div>


      {/* Main Content */}
      <main className="ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Mon Apprentissage
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white rounded-lg transition-colors">
              <User className="w-6 h-6 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-white rounded-lg transition-colors">
              <BarChart3 className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Learning Modules Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Apprendre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-slate-100"
                onMouseEnter={() => setActiveModule(module.id)}
                onMouseLeave={() => setActiveModule(null)}
              >
                {/* Module Icon/Image */}
                <div className="h-48 relative overflow-hidden rounded-t-2xl bg-white flex items-center justify-center relative overflow-hidden">
                  <div className=" group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0">
                    {module.icon}
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {module.description}
                  </p>

                  {/* Level Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        module.level === 'Debutant'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      Niveau: {module.level}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Lire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Tester mes connaissances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-slate-100 group cursor-pointer"
              >
                {/* Quiz Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {quiz.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {quiz.title}
                    </h3>
                  </div>
                </div>

                {/* Quiz Details */}
                <div className="space-y-2 mb-6 pl-1">
                  <div className="flex items-center gap-2 text-slate-600">
                    <List className="w-4 h-4" />
                    <span className="text-sm">{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{quiz.duration} min</span>
                  </div>
                </div>

                {/* Quiz Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Demarrer le quizz
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600">
          <p>@ 2026 AegisScan. Tous droites reserves</p>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2"
          >
            Politique de confidentialite
          </a>
        </footer>
      </main>
    </div>
  );
};

export default MonApprentissage;


