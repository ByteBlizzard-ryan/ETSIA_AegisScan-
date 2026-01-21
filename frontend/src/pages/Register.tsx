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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setIsLoading(true);

    // TODO: Implement register API call to NestJS backend
    // Example:
    // const response = await fetch('http://localhost:3000/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: formData.username,
    //     email: formData.email,
    //     password: formData.password
    //   })
    // });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
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
