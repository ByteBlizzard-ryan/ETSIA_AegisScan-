import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2, Link as LinkIcon } from 'lucide-react';

const PhishingArticle: React.FC = () => {
  return (
  
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Content */}
        <article>
          {/* Title Section */}
          <div className="mb-8 pb-6 border-b-2 border-blue-100">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
              Qu'est-ce que le phishing ?
            </h1>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
              Le phishing (ou hameçonnage) est une technique frauduleuse utilisée par des cybercriminels pour tromper les 
              utilisateurs et leur soutirer des informations sensibles : mots de passe, coordonnées bancaires, numéros de sécurité 
              sociale, etc.
            </p>
          </div>

          {/* Comment ça fonctionne */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              Comment ça fonctionne ?
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-slate-700 leading-relaxed">
                  L'attaquant envoie un message (e-mail, SMS, message sur les réseaux sociaux) qui semble provenir d'une source 
                  de confiance : banque, réseau social, service public, entreprise connue.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-slate-700 leading-relaxed">
                  Le message contient généralement un lien ou une pièce jointe malveillante.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-slate-700 leading-relaxed mb-2">L'objectif est de vous inciter à :</p>
                  <ul className="ml-6 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-semibold">a.</span>
                      <p className="text-slate-700">Cliquer sur un lien qui redirige vers un site faux mais réaliste.</p>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-semibold">b.</span>
                      <p className="text-slate-700">Saisir vos identifiants ou informations personnelles.</p>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-semibold">c.</span>
                      <p className="text-slate-700">Télécharger un fichier contenant un virus ou un logiciel espion.</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </section>

          {/* Exemple concret */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
              Exemple concret :
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <p className="text-slate-700 leading-relaxed">
                Un e-mail prétendument envoyé par votre banque vous alerte d'un "problème de sécurité" et vous demande de 
                "vérifier votre compte" en cliquant sur un lien. Le lien vous mène vers une page imitant parfaitement le site de la 
                banque, où vous êtes invité à saisir vos coordonnées bancaires.
              </p>
            </div>
          </section>

          {/* Comment se protéger */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
              Comment se protéger ?
            </h2>
            <ul className="space-y-3">
              {[
                "Vérifier l'expéditeur : regardez attentivement l'adresse e-mail, pas seulement le nom affiché.",
                "Ne jamais cliquer sur des liens suspects : passez plutôt par le site officiel en tapant l'adresse vous-même.",
                "Vérifier l'URL : un site sécurisé commence par https:// et présente un cadenas.",
                "Ne jamais communiquer d'informations sensibles par e-mail ou message.",
                "Utiliser l'authentification à deux facteurs (2FA) pour renforcer la sécurité de vos comptes.",
                "Signaler et supprimer les messages suspects."
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Conseil pratique */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                  Conseil pratique : Vérifiez l'URL en un coup d'œil
                </h3>
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                Avant de cliquer sur un lien dans un e-mail ou un SMS, passez votre souris dessus (sans cliquer) pour voir l'adresse 
                réelle en bas de votre écran.
              </p>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="text-slate-700 font-semibold mb-3">Méfiez-vous :</p>
                <ul className="space-y-2">
                  <li className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      Des adresses presque identiques mais avec des fautes : <span className="font-mono text-red-600">paypa1.com</span> au lieu de <span className="font-mono text-green-600">paypal.com</span>
                    </p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      Des sous-domaines trompeurs : <span className="font-mono text-red-600">secure-banque-fr.com</span> n'est pas <span className="font-mono text-green-600">banque.fr</span>
                    </p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      Des URLs raccourcies (comme <span className="font-mono text-amber-600">bit.ly/...</span>) qui masquent la vraie destination
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-6 border-t border-slate-200">
            <button className="flex-1 px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Faire le quizz
            </button>
            <button className="flex-1 px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg border-2 border-blue-800 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Retour
            </button>
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>@ 2026 AegisScan. Tous droites reserves</p>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2"
          >
            Politique de confidentialite
          </a>
        </footer>
      </div>
    </div>
  
  );
};

export default PhishingArticle;
