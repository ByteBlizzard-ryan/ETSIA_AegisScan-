import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, 
  Shield, 
  Loader2, 
  Clock, 
  Lock 
} from 'lucide-react';

// Interface alignée sur ton entité TypeORM
interface ModuleEducatif {
  id_module: string;
  titre: string;
  description: string;
  contenu: string;
  niveau: string;
  duree_estimee: number | null;
  url_image: string | null;
  acces_premium_only: boolean;
}

const PhishingArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<ModuleEducatif | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/modules-educatifs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Module non trouvé');
        return res.json();
      })
      .then(data => {
        setModule(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-12 h-12 text-[#1A365D] animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Chargement du module éducatif...</p>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800">Module introuvable</h2>
        <button onClick={() => navigate('/conseils')} className="mt-4 text-blue-600 flex items-center gap-2">
          <ArrowLeft size={18} /> Retour aux conseils
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate('/conseils')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#1A365D] mb-8 transition-colors font-semibold"
        >
          <ArrowLeft size={20} /> Retour au catalogue
        </button>

        <article className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-slate-100">
          
          {/* Header Image */}
          <div className="relative h-80 bg-slate-200">
            {module.url_image ? (
              <img src={module.url_image} alt={module.titre} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A365D] to-[#2a4a7a] text-white">
                <Shield size={80} strokeWidth={1} />
              </div>
            )}
            
            {/* Badges sur l'image */}
            <div className="absolute bottom-8 left-8 flex gap-3">
              <span className="px-4 py-1.5 bg-white/95 backdrop-blur text-[#1A365D] text-xs font-bold rounded-full shadow-lg uppercase">
                {module.niveau}
              </span>
              {module.acces_premium_only && (
                <span className="px-4 py-1.5 bg-amber-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                  <Lock size={12} /> PREMIUM
                </span>
              )}
            </div>
          </div>

          <div className="p-8 md:p-16">
            {/* Titre et Meta */}
            <header className="mb-12">
              <div className="flex items-center gap-3 text-slate-400 text-sm font-medium mb-6">
                <Clock size={18} className="text-blue-500" />
                <span>Temps de lecture estimé : {module.duree_estimee || '--'} minutes</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
                {module.titre}
              </h1>
              
              <div className="p-6 bg-blue-50/50 border-l-4 border-blue-600 rounded-r-2xl">
                <p className="text-lg text-slate-700 leading-relaxed italic">
                  {module.description}
                </p>
              </div>
            </header>

            {/* Contenu Principal stylisé avec Markdown */}
            <section className="prose prose-slate max-w-none 
              prose-headings:text-[#1A365D] 
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-slate-700 prose-p:leading-loose
              prose-li:text-slate-700
              prose-strong:text-blue-800 prose-strong:font-bold">
              
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {module.contenu}
              </ReactMarkdown>

            </section>
          </div>
        </article>

        <footer className="mt-12 mb-10 flex justify-between items-center px-6 text-slate-400 text-sm">
          <p>© 2026 AegisScan Education</p>
          <div className="flex gap-6">
            <button className="hover:text-blue-600 transition-colors">Signaler une erreur</button>
            <button className="hover:text-blue-600 transition-colors">Partager</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PhishingArticle;