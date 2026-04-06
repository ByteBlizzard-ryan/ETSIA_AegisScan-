import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Lock, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/dashboard.css"; 

interface LienBloqueData {
    id: number;
    url: string;
    date_blocage: string;
    rawDate: Date; // Pour faciliter le tri et le filtrage
}

interface APIAnalyseResponse {
    lien: { url: string };
    date_analyse: string;
    statut: string;
}

export default function LienBloque() {
    const [liens, setLiens] = useState<LienBloqueData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtre, setFiltre] = useState("Depuis 1ere analyse");
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchBlockedLinks = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            
            try {
                const response = await fetch('http://localhost:3000/analyse-lien/historique', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data: APIAnalyseResponse[] = await response.json();
                    const maintenant = new Date();
                    
                    // 1. Filtrage de base (statut bloqué) et formatage
                    let results = data
                        .filter(item => item.statut.toLowerCase() === 'bloqué')
                        .map((item, index) => ({
                            id: index,
                            url: item.lien.url,
                            date_blocage: new Date(item.date_analyse).toLocaleDateString(),
                            rawDate: new Date(item.date_analyse)
                        }));

                    // 2. Application du filtre de période
                    if (filtre === "Derniers 7 jours") {
                        const septJoursPlusTot = new Date();
                        septJoursPlusTot.setDate(maintenant.getDate() - 7);
                        results = results.filter(link => link.rawDate >= septJoursPlusTot);
                    } 
                    else if (filtre === "Derniers 30 jours") {
                        const trenteJoursPlusTot = new Date();
                        trenteJoursPlusTot.setDate(maintenant.getDate() - 30);
                        results = results.filter(link => link.rawDate >= trenteJoursPlusTot);
                    }

                    // 3. Logique de tri
                    if (filtre === "Depuis 1ere analyse") {
                        // Du plus ancien au plus récent (Ordre chronologique)
                        results.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
                    } else {
                        // Pour les autres filtres (7j, 30j), on montre les plus récents d'abord
                        results.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
                    }

                    setLiens(results);
                    setCurrentPage(1); // Reset la page au changement de filtre
                }
            } catch (error) {
                console.error("Erreur API:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlockedLinks();
    }, [filtre]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = liens.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(liens.length / itemsPerPage);

    return (
        <MainLayout title="Liens bloqués" subtitle="Aperçu des menaces neutralisées.">
            <div className="flex flex-col min-h-[calc(100vh-250px)]">
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800"></h2>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                        <select 
                            className="bg-transparent text-sm text-gray-400 outline-none cursor-pointer"
                            value={filtre}
                            onChange={(e) => setFiltre(e.target.value)}
                        >
                            <option value="Depuis 1ere analyse">Depuis 1ere analyse</option>
                            <option value="Derniers 7 jours">Derniers 7 jours</option>
                            <option value="Derniers 30 jours">Derniers 30 jours</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center text-gray-400 font-medium">
                        Analyse de la base de données...
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 flex-grow content-start">
                            {currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow h-fit">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 text-red-500">
                                                <Lock size={20} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-[#2A8A9A] truncate mb-1" title={item.url}>
                                                    {item.url}
                                                </h4>
                                                <p className="text-xs text-gray-400 font-medium">
                                                    Bloqué le: {item.date_blocage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center py-20 text-gray-400">
                                    <p>Aucune menace détectée sur cette période.</p>
                                </div>
                            )}
                        </div>

                        {liens.length > itemsPerPage && (
                            <div className="mt-auto pt-6 border-t border-gray-100 flex justify-end items-center gap-2">
                                <button 
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronLeft size={16} /> Precedent
                                </button>
                                
                                <div className="flex gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-all ${
                                                currentPage === i + 1 
                                                ? "bg-[#1A365D] text-white" 
                                                : "bg-white text-gray-600 border border-gray-100 hover:border-gray-300"
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Suivant <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}