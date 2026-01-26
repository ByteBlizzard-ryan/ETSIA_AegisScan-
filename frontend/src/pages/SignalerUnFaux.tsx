'use client';

import { useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useNavigate } from "react-router-dom";

// Types de signalement
const signalementTypes = [
    {
        id: "faux-positif",
        label: "Faux positif",
        description: "C'est un site sûr, vous l'avez bloqué.",
        color: "red",
        icon: "FP"
    },
    {
        id: "faux-negatif",
        label: "Faux négatif",
        description: "C'est dangereux, vous l'avez laissé passer.",
        color: "red",
        icon: "FN"
    },
    {
        id: "vrai-positif",
        label: "Vrai positif",
        description: "Lien malveillant correctement bloqué.",
        color: "green",
        icon: "TP"
    },
    {
        id: "vrai-negatif",
        label: "Vrai négatif",
        description: "Lien sûr correctement autorisé.",
        color: "green",
        icon: "TN"
    }
];

// Données d'exemple pour l'historique
const mockHistorique = [
    { type: "Faux positif", lien: "https://faux-lien.html", date: "09/10/2025", nombre: "07", commentaire: "Phising confirmé par ITT" },
    { type: "Faux positif", lien: "https://faux-lien.html", date: "09/10/2025", nombre: "07", commentaire: "Phising confirmé par ITT" },
    { type: "Faux positif", lien: "https://faux-lien.html", date: "09/10/2025", nombre: "07", commentaire: "Phising confirmé par ITT" },
    { type: "Faux positif", lien: "https://faux-lien.html", date: "09/10/2025", nombre: "07", commentaire: "Phising confirmé par ITT" },
];

export default function SignalerUnFaux() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lien: "",
        type: "",
        commentaire: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simuler l'envoi des données
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Formulaire soumis:", formData);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
            setFormData({
                lien: "",
                type: "",
                commentaire: "",
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1a3a4a] mb-1">Signalement de faux</h1>
                        <p className="text-[15px] text-[#6a7a8a]">
                            Signaler une erreur de classification pour le lien analysé.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/historique')}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1a5a6a] rounded-lg hover:bg-[#164a58] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Retour
                    </button>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                                <h3 className="font-medium text-green-900">Signalement envoyé avec succès !</h3>
                                <p className="text-sm text-green-700 mt-1">
                                    Merci pour votre contribution. Notre équipe analysera ce signalement.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comprendre les signalements */}
                <div className="bg-white rounded-xl border border-[#e8ecef] p-6 mb-6">
                    <h2 className="text-lg font-semibold text-[#1a5a6a] mb-3">Comprendre les signalements</h2>
                    <p className="text-sm text-[#6a7a8a] mb-4">
                        Aidez-nous à améliorer la précision du système en identifiant correctement le type d'erreur.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {signalementTypes.map((type) => (
                            <div
                                key={type.id}
                                className={`p-4 rounded-lg border-l-4 ${type.color === 'red'
                                        ? 'bg-red-50 border-red-500'
                                        : 'bg-green-50 border-green-500'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${type.color === 'red' ? 'bg-red-100' : 'bg-green-100'
                                        }`}>
                                        {type.color === 'red' ? (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        ) : (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-sm ${type.color === 'red' ? 'text-red-900' : 'text-green-900'
                                            }`}>
                                            {type.label} ({type.icon})
                                        </h3>
                                        <p className={`text-xs mt-1 ${type.color === 'red' ? 'text-red-700' : 'text-green-700'
                                            }`}>
                                            {type.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formulaire de signalement */}
                <div className="bg-white rounded-xl border border-[#e8ecef] p-6 mb-6">
                    <h2 className="text-lg font-semibold text-[#1a5a6a] mb-4">Nouveau signalement</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Lien concerné */}
                        <div>
                            <label className="block text-sm font-medium text-[#1a3a4a] mb-2">
                                Lien concerné
                            </label>
                            <input
                                type="url"
                                required
                                className="w-full px-4 py-2.5 border border-[#e0e5ea] rounded-lg text-sm focus:outline-none focus:border-[#1a9a7a] bg-[#f8fafb]"
                                placeholder="https://faux-lien-de-telechargement.html"
                                value={formData.lien}
                                onChange={(e) => setFormData(prev => ({ ...prev, lien: e.target.value }))}
                            />
                        </div>

                        {/* Type de signalement */}
                        <div>
                            <label className="block text-sm font-medium text-[#1a3a4a] mb-3">
                                Type de signalement <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {signalementTypes.map((type) => (
                                    <label
                                        key={type.id}
                                        className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.type === type.id
                                                ? 'border-[#1a9a7a] bg-[#e6f5f1]'
                                                : 'border-[#e0e5ea] hover:border-[#1a9a7a] hover:bg-[#f8fafb]'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type.id}
                                            checked={formData.type === type.id}
                                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                            className="mt-1"
                                            required
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-[#1a3a4a]">{type.label}</div>
                                            <div className="text-xs text-[#6a7a8a] mt-1">{type.description}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Commentaire */}
                        <div>
                            <label className="block text-sm font-medium text-[#1a3a4a] mb-2">
                                Commentaire (Optionnel)
                            </label>
                            <textarea
                                className="w-full px-4 py-2.5 border border-[#e0e5ea] rounded-lg text-sm focus:outline-none focus:border-[#1a9a7a] bg-[#f8fafb] min-h-[100px]"
                                placeholder="Expliquer pourquoi..."
                                value={formData.commentaire}
                                onChange={(e) => setFormData(prev => ({ ...prev, commentaire: e.target.value }))}
                            />
                        </div>

                        {/* Boutons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/historique')}
                                className="px-6 py-2.5 border border-[#e0e5ea] text-[#1a3a4a] rounded-lg hover:bg-[#f8fafb] transition-colors font-medium text-sm"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2.5 bg-[#1a5a6a] text-white rounded-lg hover:bg-[#164a58] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    'Envoyer le signalement'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Historique des signalements */}
                <div className="bg-white rounded-xl border border-[#e8ecef] p-6">
                    <h2 className="text-lg font-semibold text-[#1a5a6a] mb-4">Historique des signalements</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#e8ecef]">
                                    <th className="text-left py-3 px-4 font-medium text-[#6a7a8a]">Type</th>
                                    <th className="text-left py-3 px-4 font-medium text-[#6a7a8a]">Lien</th>
                                    <th className="text-left py-3 px-4 font-medium text-[#6a7a8a]">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-[#6a7a8a]">Nombre de signalement</th>
                                    <th className="text-left py-3 px-4 font-medium text-[#6a7a8a]">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockHistorique.map((item, index) => (
                                    <tr key={index} className="border-b border-[#f0f2f4] hover:bg-[#f8fafb]">
                                        <td className="py-3 px-4 text-[#1a3a4a]">{item.type}</td>
                                        <td className="py-3 px-4">
                                            <a href="#" className="text-[#2a8a9a] hover:underline">{item.lien}</a>
                                        </td>
                                        <td className="py-3 px-4 text-[#6a7a8a]">{item.date}</td>
                                        <td className="py-3 px-4 text-[#1a3a4a] text-center">{item.nombre}</td>
                                        <td className="py-3 px-4 text-[#6a7a8a]">{item.commentaire}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
