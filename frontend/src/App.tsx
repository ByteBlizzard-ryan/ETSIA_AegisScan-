import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LinkDetails from "./pages/LinkDetails";
//import Article from "./pages/Article";
//import Quiz from "./pages/Quiz";
//import Progression from "./pages/Progression";
import Profil from "./pages/Profil";
import Historique from "./pages/Historique";
//import LiensBloques from "./pages/LiensBloques";
import Statistiques from "./pages/Statistiques";
import Pricing from "./pages/pricing.tsx";
import PrivacyPolicy from "./pages/privacy-policy.tsx";
import Landing from "./pages/landing.tsx";
import Features from "./pages/features.tsx";
import SignalerUnFaux from "./pages/SignalerUnFaux";
import QuizResult from "./pages/QuizResult.tsx";
import Progression from "./pages/Progression.tsx";
import LienBloque from "./pages/LienBloque.tsx";
import PhishingQuiz from "./pages/PhishingQuiz.tsx";
import PhishingArticle from "./pages/Article.tsx";
import LienBloques from "./pages/LiensBloques.tsx";
import MonApprentissage from "./pages/MonApprentissage.tsx";
import Conseils from "./pages/Conseils.tsx";
import QuizPage from "./pages/Quiz.tsx";
import Parametres from "./pages/Parametres";
import TestExtension from "./pages/TestExtension";
import ThreatPopup from "./components/ThreatPopup";
import { useLinkInterception } from "./hooks/useLinkInterception";

function App() {
  const { threatPopup, closeThreatPopup } = useLinkInterception();

  return (
    <>
      <Routes>
        // Reine utilise ce canva pour tes routes
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/test-extension" element={<TestExtension />} />
        {/*<Route path="/detail/lien/:id" element={<Detail />} />*/}
        <Route path="/signaler-un-faux" element={<SignalerUnFaux />} />


        // Etienne utilise ce canva pour tes routes
        {/* <Route path="/liens-bloques" element={<LiensBloques />} /> */}
        <Route path="/conseils" element={<Conseils />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/progression"      element={<Progression />} />
        <Route path="/quiz/result"      element={<QuizResult />} />
        <Route path="/lien-bloque"      element={<LienBloque />} />
        <Route path="/liens-bloques"      element={<LienBloques />} />
        <Route path="/phishing-quiz"    element={<PhishingQuiz />} />
        <Route path="/article/:id" element={<PhishingArticle />} />

        // Ali utilise ce canva pour tes routes
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lien/:linkId/details" element={<LinkDetails />} />
        <Route path="/statistiques" element={<Statistiques />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/features" element={<Features />} />
      </Routes>

      {/* Popup de menace globale */}
      <ThreatPopup
        isVisible={threatPopup.isVisible}
        url={threatPopup.url}
        result={threatPopup.result}
        onClose={closeThreatPopup}
      />
    </>
  );
}

export default App;

