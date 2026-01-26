'use client';

import { X, AlertTriangle, Shield, Globe, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UrlDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    urlData: {
        id: string;
        url: string;
        date: string;
        riskLevel: string;
        status: string;
        source: string;
    } | null;
}

export default function UrlDetailsModal({ isOpen, onClose, urlData }: UrlDetailsModalProps) {
    const navigate = useNavigate();

    if (!isOpen || !urlData) return null;

    const getRiskDetails = (riskLevel: string) => {
        switch (riskLevel) {
            case 'Élevé':
                return {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    description: "Ce lien présente un risque élevé de phishing ou de malware."
                };
            case 'Moyen':
                return {
                    icon: <Shield className="w-5 h-5" />,
                    description: "Ce lien présente des caractéristiques suspectes nécessitant une vigilance particulière."
                };
            case 'Faible':
                return {
                    icon: <Globe className="w-5 h-5" />,
                    description: "Ce lien semble sécurisé mais une vigilance standard est recommandée."
                };
            default:
                return {
                    icon: <Globe className="w-5 h-5" />,
                    description: "Aucune information de risque spécifique disponible."
                };
        }
    };
    const riskColors: Record<string, { bg: string; text: string; bgLight: string }> = {
        Élevé: { bg: "#dc2626", text: "#ffffff", bgLight: "#fee2e2" },
        Modéré: { bg: "#d97706", text: "#ffffff", bgLight: "#fef3c7" },
        Moyen: { bg: "#d97706", text: "#ffffff", bgLight: "#fef3c7" },
        Faible: { bg: "#059669", text: "#ffffff", bgLight: "#dcfce7" },
    };

    const riskDetails = getRiskDetails(urlData.riskLevel);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Détails de l'analyse</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* URL Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">URL analysée</h3>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-mono text-sm break-all">{urlData.url}</p>
                        </div>
                    </div>

                    {/* Risk Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Niveau de risque</h3>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{
                                    backgroundColor: riskColors[urlData.riskLevel]?.bg || '#f3f4f6',
                                    color: riskColors[urlData.riskLevel]?.text || '#374151'
                                }}>
                                    {riskDetails.icon}
                                </div>
                                <div>
                                    <span className="font-medium">{urlData.riskLevel}</span>
                                    <p className="text-sm text-gray-500 mt-1">{riskDetails.description}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Statut</h3>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gray-100">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <span className="font-medium">{urlData.status}</span>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {urlData.status === 'Bloqué'
                                            ? "Ce lien a été bloqué automatiquement par notre système."
                                            : urlData.status === 'Sûr'
                                                ? "Ce lien a été vérifié et est considéré comme sécurisé."
                                                : "Ce lien nécessite une investigation supplémentaire."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Informations</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">
                                        <strong>Date d'analyse:</strong> {urlData.date}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">
                                        <strong>Source:</strong> {urlData.source}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Indicateurs de risque</h3>
                            <ul className="space-y-2 text-sm">
                                {urlData.riskLevel === 'Élevé' && (
                                    <>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span>Domaine suspect ou récemment enregistré</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span>Imitations de sites connus détectées</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span>Certificat SSL invalide ou absent</span>
                                        </li>
                                    </>
                                )}
                                {urlData.riskLevel === 'Moyen' && (
                                    <>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span>Comportement inhabituel détecté</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span>Réputation mixte du domaine</span>
                                        </li>
                                    </>
                                )}
                                {urlData.riskLevel === 'Faible' && (
                                    <>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>Domaine vérifié et réputé</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>Certificat SSL valide présent</span>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t pt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Fermer
                        </button>
                        <button
                            onClick={() => navigate('/signaler-un-faux')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                            <AlertTriangle size={16} />
                            Signaler un faux
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}