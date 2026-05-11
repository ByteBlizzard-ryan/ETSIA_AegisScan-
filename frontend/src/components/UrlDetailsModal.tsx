'use client';

import { X, AlertTriangle, Shield, Globe, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router"; // Correction de l'import (souvent react-router ou react-router-dom)

// --- INTERFACE MISE À JOUR ---
interface UrlDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    urlData: {
        id_analyse: string;
        date_analyse: string;
        niveau_risque: string;
        statut: string;
        analyse_verdict_final: string;
        score_risque: number;
        canal_source: string;
        temps_analyse_ms: number;
        motifs: string;
        lien: {
            id_lien: string;
            url: string;
            total_analyses: number;
        };
    } | null;
}

export default function UrlDetailsModal({ isOpen, onClose, urlData }: UrlDetailsModalProps) {
    const navigate = useNavigate();

    // Sécurité si la modal est fermée ou sans données
    if (!isOpen || !urlData) return null;

    // Fonction pour expliquer le score
    const getScoreExplanation = (score: number) => {
        if (score > 50) {
            return "Score élevé : Plus de 50% des moteurs de sécurité ont détecté des menaces. Ce lien est considéré comme dangereux.";
        } else if (score > 10) {
            return "Score modéré : Entre 10% et 50% des moteurs ont détecté des problèmes. Ce lien est suspect et nécessite de la prudence.";
        } else if (score > 0) {
            return "Score faible : Moins de 10% des moteurs ont détecté des problèmes. Le lien est généralement sûr mais quelques alertes mineures ont été relevées.";
        } else {
            return "Score parfait : Aucun moteur de sécurité n'a détecté de menace. Ce lien est considéré comme sûr.";
        }
    };

    // Mapping des risques (Adapté aux valeurs de ta DB : DANGEREUX, SUSPECT, SÛR)
    const getRiskDetails = (niveau: string) => {
        const n = niveau.toUpperCase();
        switch (n) {
            case 'DANGEREUX':
                return {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    description: "Ce lien présente un risque élevé de phishing ou de malware.",
                    label: "Dangereux",
                    color: "#dc2626",
                    bg: "#fee2e2"
                };
            case 'SUSPECT':
                return {
                    icon: <Shield className="w-5 h-5" />,
                    description: "Ce lien présente des caractéristiques suspectes nécessitant une vigilance particulière.",
                    label: "Suspect",
                    color: "#d97706",
                    bg: "#fef3c7"
                };
            case 'SÛR':
                return {
                    icon: <Globe className="w-5 h-5" />,
                    description: "Ce lien a été vérifié et semble sécurisé.",
                    label: "Sûr",
                    color: "#059669",
                    bg: "#dcfce7"
                };
            default:
                return {
                    icon: <Globe className="w-5 h-5" />,
                    description: "Analyse standard effectuée.",
                    label: niveau,
                    color: "#374151",
                    bg: "#f3f4f6"
                };
        }
    };

    const risk = getRiskDetails(urlData.niveau_risque);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800">Détails de l'analyse</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* URL Section */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">URL analysée</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="font-mono text-sm break-all text-blue-700 selection:bg-blue-100">
                                {urlData.lien.url}
                            </p>
                        </div>
                    </div>

                    {/* Score Section avec explication */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Score de sécurité</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-2xl font-bold ${
                                    urlData.score_risque > 50 ? 'text-red-600' :
                                    urlData.score_risque > 10 ? 'text-yellow-600' :
                                    'text-green-600'
                                }`}>
                                    {urlData.score_risque}%
                                </span>
                                <span className="text-sm text-gray-600">de risque détecté</span>
                            </div>
                            <p className="text-sm text-blue-700">
                                {getScoreExplanation(urlData.score_risque)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Risk Card */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Niveau de risque</h3>
                            <div className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: risk.color + '33', backgroundColor: risk.bg + '50' }}>
                                <div className="p-2 rounded-lg" style={{ backgroundColor: risk.color, color: '#fff' }}>
                                    {risk.icon}
                                </div>
                                <div>
                                    <span className="font-bold text-lg" style={{ color: risk.color }}>{risk.label}</span>
                                    <p className="text-sm text-gray-600 leading-relaxed mt-1">{risk.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Statut du système</h3>
                            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                                <div className="p-2 rounded-lg bg-gray-200 text-gray-700">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <span className="font-bold text-lg capitalize text-gray-800">{urlData.statut}</span>
                                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                        {urlData.statut === 'bloqué' 
                                            ? "L'accès à ce lien a été neutralisé pour votre sécurité." 
                                            : "L'accès à ce lien est autorisé."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metadata & Verdict */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Informations détaillées</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-gray-400" size={18} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Date d'analyse</span>
                                    <span className="text-sm font-medium">{new Date(urlData.date_analyse).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="text-gray-400" size={18} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Canal source</span>
                                    <span className="text-sm font-medium">{urlData.canal_source || 'Non spécifié'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Globe className="text-gray-400" size={18} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Temps d'analyse</span>
                                    <span className="text-sm font-medium">{urlData.temps_analyse_ms}ms</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Verdict et motifs */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="mb-3">
                                <span className="text-[10px] text-gray-400 uppercase font-bold">Verdict Final</span>
                                <p className="text-sm font-medium italic">"{urlData.analyse_verdict_final || 'Aucun verdict'}"</p>
                            </div>
                            {urlData.motifs && (
                                <div>
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Motifs de l'analyse</span>
                                    <p className="text-sm text-gray-600 leading-relaxed">{urlData.motifs}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-end items-center">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Fermer
                        </button>
                        <button
                            onClick={() => navigate('/signaler-un-faux')}
                            className="px-5 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all shadow-md shadow-red-200 flex items-center gap-2"
                        >
                            <AlertTriangle size={16} />
                            Signaler une erreur
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}