'use client';

import { useState,useEffect } from "react";
import { Headphones, MonitorSmartphone, AlertCircle, CheckCircle2 } from "lucide-react"; // Ajout d'icônes pour l'UI
import MainLayout from "../components/MainLayout";
import {jwtDecode} from "jwt-decode";

export default function Profil() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Cette fonction s'exécute une seule fois quand la page s'affiche
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // On décode le token pour extraire les infos
        const decoded: any = jwtDecode(token);
        
        // Si ton token contient l'email, on met à jour l'état
        // Vérifie si dans ton backend NestJS tu as mis 'email' dans le payload du JWT
        if (decoded.email) {
          setEmail(decoded.email);
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    }
  }, []);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Petit bonus pour le succès

  const handleSavePassword = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Validation de correspondance
    if (passwords.new !== passwords.confirm) {
      setErrorMessage("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }

    // 2. Validation de la force du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (passwords.new.length < 8 || !passwordRegex.test(passwords.new)) {
      setErrorMessage("Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/utilisateurs/change-password', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          oldPassword: passwords.current,
          newPassword: passwords.new
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Mot de passe modifié avec succès !");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setErrorMessage(data.message || "L'ancien mot de passe est incorrect.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout title="Mon profil">
      <div className="max-w-2xl space-y-6">
        {/* Infos Personnelles */}
        <div className="card">
          <h2 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Informations Personnelles
          </h2>
          <div>
            <label className="label" htmlFor="email">Adresse email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              disabled
              style={{ backgroundColor: "#f8fafc" }}
            />
          </div>
        </div>

        {/* Gestion du mot de passe */}
        <div className="card">
          <h2 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Gérer le mot de passe
          </h2>

          {/* --- AFFICHAGE DES MESSAGES D'ERREUR OU SUCCÈS --- */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center gap-2 text-sm">
              <CheckCircle2 size={18} />
              {successMessage}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="currentPassword">Ancien mot de passe</label>
              <input
                id="currentPassword"
                type="password"
                className="input"
                placeholder="••••••••"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
            </div>
            <div>
              <label className="label" htmlFor="newPassword">Nouveau mot de passe</label>
              <input
                id="newPassword"
                type="password"
                className="input"
                placeholder="••••••••"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
            </div>
            <div>
              <label className="label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                id="confirmPassword"
                type="password"
                className="input"
                placeholder="••••••••"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => {
                    setPasswords({ current: "", new: "", confirm: "" });
                    setErrorMessage("");
                }}
              >
                Annuler
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSavePassword}
                disabled={isSaving || !passwords.current || !passwords.new || !passwords.confirm}
              >
                {isSaving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="card">
          <h2 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
            Ressources et support
          </h2>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 text-sm hover:underline" style={{ color: "var(--foreground)" }}>
              <Headphones size={18} style={{ color: "var(--muted-foreground)" }} />
              Support
            </a>
            <a href="#" className="flex items-center gap-3 text-sm hover:underline" style={{ color: "var(--foreground)" }}>
              <MonitorSmartphone size={18} style={{ color: "var(--muted-foreground)" }} />
              Canaux surveillés
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}