import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
//import Conseils from "./pages/Conseils";
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

function App() {
  return (
    <Routes>
        // Reine utilise ce canva pour tes routes
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/historique" element={<Historique />} />
      {/*<Route path="/detail/lien/:id" element={<Detail />} />*/}
      {/*<Route path="/Siganalement/:id" element={<Detail />} />*/}


        // Etienne utilise ce canva pour tes routes
      {/*
      <Route path="/liens-bloques" element={<LiensBloques />} />
      <Route path="/conseils" element={<Conseils />} />
      ...............
      */}

        // Ali utilise ce canva pour tes routes
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistiques" element={<Statistiques />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/features" element={<Features />} />


    </Routes>
  );
}

export default App;
