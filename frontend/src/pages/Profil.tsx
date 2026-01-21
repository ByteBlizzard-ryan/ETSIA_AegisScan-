'use client';

import { useState } from "react";
import { Headphones, MonitorSmartphone } from "lucide-react";
import MainLayout from "../components/MainLayout";

export default function Profil() {
  const [email, setEmail] = useState("jean@gmail.com");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setIsSaving(true);

    // TODO: Implement password update API call to NestJS backend
    // Example:
    // const response = await fetch('http://localhost:3000/users/password', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     currentPassword: passwords.current,
    //     newPassword: passwords.new
    //   })
    // });

    setTimeout(() => {
      setIsSaving(false);
      setPasswords({ current: "", new: "", confirm: "" });
      alert("Mot de passe mis à jour! (Simulation)");
    }, 1000);
  };

  return (
    <MainLayout title="Mon profil">
      <div className="max-w-2xl space-y-6">
        {/* Personal Info */}
        <div className="card">
          <h2
            className="font-semibold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Informations Personnelles
          </h2>
          <div>
            <label className="label" htmlFor="email">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              style={{ backgroundColor: "#f8fafc" }}
            />
          </div>
        </div>

        {/* Password Management */}
        <div className="card">
          <h2
            className="font-semibold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Gérer le mot de passe
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="currentPassword">
                Ancien mot de passe
              </label>
              <input
                id="currentPassword"
                type="password"
                className="input"
                placeholder="••••••••"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label" htmlFor="newPassword">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                className="input"
                placeholder="••••••••"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
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
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setPasswords({ current: "", new: "", confirm: "" })}
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
          <h2
            className="font-semibold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Ressources et support
          </h2>
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 text-sm hover:underline"
              style={{ color: "var(--foreground)" }}
            >
              <Headphones size={18} style={{ color: "var(--muted-foreground)" }} />
              Support
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm hover:underline"
              style={{ color: "var(--foreground)" }}
            >
              <MonitorSmartphone size={18} style={{ color: "var(--muted-foreground)" }} />
              Canaux surveillés
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
