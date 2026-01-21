'use client';

import React from "react"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement login API call to NestJS backend
    // Example:
    // const response = await fetch('http://localhost:3000/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Bon retour parmi nous
        </h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          Connectez-vous pour accéder à votre tableau de bord de sécurité
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label" htmlFor="email">
            Adresse email ou nom d'utilisateur
          </label>
          <input
            id="email"
            type="text"
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

        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-sm"
            style={{ color: "var(--primary)" }}
          >
            Mot de passe oublié?
          </Link>
        </div>

        <div className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
          Pas encore de compte?{" "}
          <Link to="/register" style={{ color: "var(--primary)" }}>
            S'inscrire gratuitement
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full py-3"
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </AuthLayout>
  );
}
