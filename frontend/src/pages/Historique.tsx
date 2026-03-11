'use client';

import { useState, useEffect, useMemo } from "react";
import { Filter, ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react";
import MainLayout from "../components/MainLayout";
import UrlDetailsModal from "../components/UrlDetailsModal";

// --- INTERFACES & TYPES ---
interface AnalyseDB {
    id_analyse: string;
    date_analyse: string;
    niveau_risque: string;
    statut: string; // 'autorisé' | 'bloqué'
    analyse_verdict_final: string;
    lien: {
        url: string;
    };
}

const ITEMS_PER_PAGE = 8;

// --- CONFIGURATION DES STYLES ---
const riskColors: Record<string, string> = {
    'DANGEREUX': "#dc2626",
    'SUSPECT': "#d97706",
    'SÛR': "#059669",
};

const statusStyles: Record<string, { bg: string; text: string }> = {
    'bloqué': { bg: "#fee2e2", text: "#dc2626" },
    'autorisé': { bg: "#dcfce7", text: "#059669" },
};

export default function Historique() {
    // 1. ÉTATS (STATES)
    const [history, setHistory] = useState<AnalyseDB[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    
    // États pour la Modal
    const [selectedUrl, setSelectedUrl] = useState<AnalyseDB | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 2. RÉCUPÉRATION DES DONNÉES
    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/analyse-lien/historique', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setHistory(data);
                }
            } catch (error) {
                console.error("Erreur historique:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // 3. LOGIQUE DE FILTRAGE ET RECHERCHE (useMemo pour la performance)
    const filteredData = useMemo(() => {
        return history.filter((item) => {
            const matchesSearch = item.lien.url.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = statusFilter === "all" || item.statut === statusFilter;
            return matchesSearch && matchesFilter;
        });
    }, [history, searchTerm, statusFilter]);

    // 4. LOGIQUE DE PAGINATION
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Reset de la page quand on recherche ou filtre
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    return (
        <MainLayout title="Historique des analyses" subtitle="Retrouvez le détail de vos vérifications passées.">
            
            {/* BARRE DE RECHERCHE ET FILTRES */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4 flex-1 max-w-2xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Rechercher une URL dans votre historique..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg">
                        <Filter size={16} className="text-gray-400" />
                        <select
                            className="outline-none bg-transparent text-sm font-medium"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="autorisé">Autorisé</option>
                            <option value="bloqué">Bloqué</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TABLEAU DES DONNÉES */}
            <div className="bg-white rounded-[5px] shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-semibold uppercase tracking-wider">URL du lien</th>
                            <th className="p-4 font-semibold uppercase tracking-wider">Date d'analyse</th>
                            <th className="p-4 font-semibold uppercase tracking-wider">Verdict Final</th>
                            <th className="p-4 font-semibold uppercase tracking-wider">Niveau de Risque</th>
                            <th className="p-4 font-semibold uppercase tracking-wider">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <Loader2 className="animate-spin" size={24} />
                                        Chargement de vos données...
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <tr 
                                    key={item.id_analyse} 
                                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={() => { setSelectedUrl(item); setIsModalOpen(true); }}
                                >
                                    <td rel="noreferrer" className="url-link p-4 max-w-[300px] truncate font-medium" title={item.lien.url}>
                                        {item.lien.url}
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(item.date_analyse).toLocaleString('fr-FR', {
                                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {item.analyse_verdict_final || "Aucun verdict"}
                                    </td>
                                    <td className="p-4">
                                        <span className="font" style={{ color: riskColors[item.niveau_risque] || "#374151" }}>
                                            {item.niveau_risque}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                      <span className={`status-badge ${item.statut === "bloqué" ? "blocked" : "cleaned"}`}>
                                          {item.statut}
                                      </span>
                                  </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-400">
                                    Aucune analyse trouvée pour votre recherche.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION DYNAMIQUE */}
            {!isLoading && totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg border shadow-sm">
                    <p className="text-sm text-gray-500">
                        Affichage de <span className="font-medium">{startIndex + 1}</span> à <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)}</span> sur <span className="font-medium">{filteredData.length}</span> analyses
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        {/* Génération des numéros de page */}
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-10 h-10 rounded-md text-sm font-semibold transition-all ${
                                    currentPage === i + 1 
                                    ? "bg-blue-600 text-white shadow-md" 
                                    : "hover:bg-gray-100 text-gray-600"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL DE DÉTAILS */}
            <UrlDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                urlData={selectedUrl}
            />
        </MainLayout>
    );
}