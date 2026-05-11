'use client';

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { extensionSync } from "../services/extensionSync";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // État pour afficher les erreurs
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Réinitialise l'erreur au début de la tentative

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        
        // On récupère le message d'erreur du backend NestJS (UnauthorizedException)
        throw new Error(data.message || "Identifiants incorrects");
      }

      console.log("Connexion réussie !");

      // --- LES ÉTAPES CRUCIALES ---
      // 1. On stocke le token JWT (indispensable pour les futurs fetch)
      localStorage.setItem("token", data.access_token);
      
      // 2. On stocke les infos utilisateur (pour afficher le nom sur le dashboard)
      localStorage.setItem("user", JSON.stringify(data.user));

      // 2. On stocke l'ID utilisateur SEUL (C'est ce que ton Quiz.tsx va chercher)
      localStorage.setItem("user_id", data.user.id);

      // 3. Synchroniser le token avec l'extension navigateur
      await extensionSync.syncToken(data.access_token);

      // 4. Redirection vers le dashboard
      navigate("/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Popup pour l'affichage des messages d'erreurs */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 transform animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Erreur de connexion
              </h3>
              
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {error}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setError(null)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:text-sm"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mx-6 my-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            Bon retour parmi nous
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            Connectez-vous pour accéder à votre tableau de bord de sécurité
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label" htmlFor="email">
              Adresse email
            </label>
            <input
              id="email"
              type="email" // Changé en type email pour validation HTML5
              className="input"
              placeholder="exemple@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm"
              style={{ color: "#6BA5E4", textDecoration: "underline" }}
            >
              {/* Mot de passe oublié ? */}
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>

          <div className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            Pas encore de compte ?{" "}
            <Link to="/register" style={{ color: "#6BA5E4", textDecoration: "underline" }}>
              S'inscrire gratuitement
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}