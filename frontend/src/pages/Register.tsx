'use client';

import React from "react"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
//Fonction handleSubmit mise à jour pour gérer les erreurs du DTO et recevoir les données depuis la base de données
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        acceptTerms: formData.acceptTerms
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // ICI : On récupère le message précis du DTO
      if (data.message) {
        // Si c'est un tableau (plusieurs erreurs), on prend la première
        const errorMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errorMsg);
      }
      throw new Error("Une erreur est survenue");
    }

    navigate("/dashboard");
  } catch (err: any) {
    setError(err.message); 
  } finally {
    setIsLoading(false);
  }
};

  return (
    <AuthLayout>
      <div className="mx-6 my-3">
        <div className="text-center mb-6">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            Créer un compte
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            Commencez à sécuriser vos liens avec AegisScan
          </p>
        </div>

        {error && (
          <div
            className="mb-4 p-3 rounded-lg text-sm"
            style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="username">
              Nom utilisateur
            </label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Jean"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="email">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
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
              minLength={8}
            />
          </div>

          <div>
            <label className="label" htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              className="mt-1"
              checked={formData.acceptTerms}
              onChange={(e) =>
                setFormData({ ...formData, acceptTerms: e.target.checked })
              }
            />
            <label
              htmlFor="terms"
              className="text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              J'accepte la{" "}
              <a href="#" style={{ color: "#6BA5E4", textDecoration: "underline" }}>
                politique de confidentialité
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full py-3 transition-opacity ${!formData.acceptTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading || !formData.acceptTerms}
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </button>

          <div
            className=" text-left"
            style={{ color: "var(--muted-foreground)" }}
          >
            Vous avez déjà un compte?{" "}
            <Link to="/login" style={{ color: "#6BA5E4", textDecoration: "underline" }}>
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
