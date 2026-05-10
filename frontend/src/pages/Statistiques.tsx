"use client"

import MainLayout from "../components/MainLayout";
import StatCard from "../components/StatCard";
import {
    Link2,
    ShieldCheck,
    Target,
    CheckCircle,
    Diamond
} from "lucide-react"
import "../styles/statistiques.css"
import { useState, useEffect } from "react";

// 1. Define Types for TypeScript
interface ChartData {
    date: string;
    count: number;
}

interface PieData {
    label: string;
    value: number;
}

interface StatsState {
    totalLinks: number;
    threatsDetected: number;
    averageRiskScore: string | number;
    protectionRate: string;
    lineChart: ChartData[];
    pieChart: PieData[];
}

export default function Statistiques() {

    // --- 1. MODIFICATION ICI : CONFIGURATION DES COULEURS STRICTES ---
    const COLORS_STRICT: Record<string, string> = {
        "sûr": "#10b981",       // Vert (Pour le succès)
        "dangereux": "#ef4444",  // Rouge (Pour tout le reste/danger)
    };

    // 2. Initialize state
    const [stats, setStats] = useState<StatsState>({
        totalLinks: 0,
        threatsDetected: 0,
        averageRiskScore: "N/A",
        protectionRate: "100%",
        lineChart: [], 
        pieChart: []   
    });

    // Filtre de jours (Mis à 365 par défaut pour "Depuis le début")
    const [days, setDays] = useState(1000);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) return;

                const response = await fetch(`http://localhost:3000/stats?days=${days}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // --- AJOUTE CES LOGS ICI ---
                console.log("=== DEBUG DATA BASE DE DONNÉES ===");
                console.log("Valeur totalLinks reçue du backend :", data.totalLinks);
                console.log("Détail du camembert (pieChart) :", data.pieChart);
                
                // Calcul manuel pour vérifier la cohérence
                const totalPie = data.pieChart.reduce((acc, curr) => acc + curr.value, 0);
                console.log("Somme calculée du camembert :", totalPie);
                // ---------------------------

                    setStats({
                        ...data,
                        lineChart: data.lineChart || [],
                        pieChart: data.pieChart || []
                    });
                }
            } catch (error) {
                console.error("Echec lors de la tentative de fetch les données", error);
            }
        };

        loadStats();
    }, [days]);

    // --- Dynamic Logic for Charts ---

    const getLinePath = (data: ChartData[]) => {
        if (!data || data.length < 2) return "M 0 180 L 400 180";
        const maxVal = Math.max(...data.map(d => d.count), 1);
        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * 400;
            const y = 200 - (d.count / maxVal) * 160 - 20; 
            return `${x},${y}`;
        });
        return `M ${points.join(" L ")}`;
    };

    // --- 2. MODIFICATION ICI : LOGIQUE DE RENDU DU DONUT STRICT ---
    // const renderDonutSegments = () => {
    //     const pieData = stats.pieChart || [];
    //     const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
    //     if (total === 0) return <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />;

    //     let offset = 0;

    //     return pieData.map((item, i) => {
    //         const percentage = (item.value / total) * 100;
    //         const dashArray = `${(percentage * 219.9) / 100} 219.9`;
    //         const dashOffset = (offset * 219.9) / 100;
    //         offset += percentage;

    //         // --- LOGIQUE STRICTE : Si ce n'est pas "sûr", c'est forcément Rouge ---
    //         const currentLabel = item.label.toLowerCase();
    //         const segmentColor = (currentLabel === "sûr") 
    //             ? COLORS_STRICT["sûr"] 
    //             : COLORS_STRICT["dangereux"]; // Force le rouge pour "suspect" ou tout autre label

    //         return (
    //             <circle
    //                 key={`segment-${item.label}-${i}`}
    //                 cx="50"
    //                 cy="50"
    //                 r="35"
    //                 stroke={segmentColor} // Utilise la couleur stricte
    //                 strokeWidth="20"
    //                 fill="none"
    //                 strokeDasharray={dashArray}
    //                 strokeDashoffset={-dashOffset}
    //                 style={{ transition: 'all 0.5s ease' }}
    //             />
    //         );
    //     });
    // };

        const renderDonutSegments = () => {
        const pieData = stats.pieChart || [];
        
        // --- ERREUR ICI DANS TON CODE ACTUEL ---
        // Si tu utilises stats.totalLinks, le cercle sera majoritairement gris.
        // Il faut calculer le total uniquement sur les segments que tu veux afficher.
        const displayTotal = pieData.reduce((acc, curr) => acc + curr.value, 0);

        if (displayTotal === 0) return null;

        let offset = 0;

        return pieData.map((item, i) => {
            // On calcule le pourcentage par rapport au total AFFICHÉ (Sûr + Dangereux)
            const percentage = (item.value / displayTotal) * 100;
            
            const dashArray = `${(percentage * 219.9) / 100} 219.9`;
            const dashOffset = (offset * 219.9) / 100;
            offset += percentage;

            const currentLabel = item.label.toLowerCase();
            const segmentColor = (currentLabel === "sûr") 
                ? COLORS_STRICT["sûr"] 
                : COLORS_STRICT["dangereux"];

            return (
                <circle
                    key={`segment-${item.label}-${i}`}
                    cx="50"
                    cy="50"
                    r="35"
                    stroke={segmentColor}
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={dashArray}
                    strokeDashoffset={-dashOffset}
                    style={{ transition: 'all 0.5s ease' }}
                />
            );
        });
    };

    return (
        <MainLayout title="Statistiques">
            {/* Header Actions - Filtre par défaut "Depuis la première analyse" */}
            <div className="flex justify-end mb-6">
                <select 
                    className="date-selector bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 cursor-pointer"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                >
                    <option value={10000}>Depuis la première analyse</option>
                    <option value={7}>Derniers 7 jours</option>
                    <option value={30}>Derniers 30 jours</option>
                    <option value={90}>Derniers 90 jours</option>
                </select>
            </div>

            {/* Stats Cards - Pas de changement de couleur */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <StatCard
                    title="Liens analysés"
                    value={stats.totalLinks ?? 0}
                    subtitle={days === 365 ? "Historique complet" : `Depuis la première analyse`}
                    icon={Link2}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Menaces détectées"
                    value={stats.threatsDetected ?? 0}
                    subtitle="Activité totale"
                    icon={ShieldCheck}
                    iconColor="#ef4444" // Mis en Rouge (strict)
                />
                <StatCard
                    title="Score de risque moyen"
                    value={stats.averageRiskScore ?? "N/A"}
                    subtitle="Stable"
                    icon={Target}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Taux de protection"
                    value={stats.protectionRate ?? "100%"}
                    subtitle="Efficacité du système"
                    icon={CheckCircle}
                    iconColor="#10b981" // Mis en Vert (strict)
                />
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <div className="chart-card">
                    <h3 className="chart-title">Performance des Liens</h3>
                    <p className="chart-description">
                        Evolution de l'activité sur la période sélectionnée.
                    </p>
                    <div className="chart-container">
                        <div className="line-chart">
                            <div className="chart-area">
                                <svg className="line-chart-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    <line x1="0" y1="50" x2="400" y2="50" stroke="#e8ecef" strokeDasharray="4" />
                                    <line x1="0" y1="100" x2="400" y2="100" stroke="#e8ecef" strokeDasharray="4" />
                                    <line x1="0" y1="150" x2="400" y2="150" stroke="#e8ecef" strokeDasharray="4" />
                                    
                                    <path
                                        d={getLinePath(stats.lineChart)}
                                        className="chart-line total"
                                        fill="none"
                                        stroke="#4a8a9a"
                                        strokeWidth="3"
                                        style={{ transition: 'd 0.5s ease' }}
                                    />
                                </svg>
                            </div>
                            <div className="chart-x-axis">
                                {stats.lineChart.length > 0 ? (
                                    stats.lineChart.map((d, i) => (
                                        <span key={i}>{d.date.split('-').pop()}</span>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Distribution des Menaces</h3>
                    <p className="chart-description">
                        Répartition binaire (Vert: Sûr, Rouge: Danger).
                    </p>
                    <div className="chart-container">
                        <div className="donut-chart-container">
                            <div className="donut-chart">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />
                                    {renderDonutSegments()}
                                </svg>
                                
                                {/* --- MODIFICATION ICI : LÉGENDE STRICTE --- */}
                                <div className="donut-labels-list mt-4">
                                    {(stats.pieChart || []).map((item, i) => {
                                        const currentLabel = item.label.toLowerCase();
                                        // On ignore l'affichage dans la légende si la valeur est 0 (propre)
                                        if (item.value === 0) return null; 

                                        return (
                                            <div key={i} className="flex justify-between text-xs mb-1">
                                                <div className="flex items-center gap-1">
                                                    <div 
                                                        className="w-2 h-2 rounded-full" 
                                                        style={{ 
                                                            backgroundColor: (currentLabel === "sûr") 
                                                                ? COLORS_STRICT["sûr"] 
                                                                : COLORS_STRICT["dangereux"]
                                                        }}
                                                    ></div>
                                                    <span className="capitalize">{item.label}</span>
                                                </div>
                                                <span className="font-bold">{item.value}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Banner */}
            <div className="premium-banner mt-6">
                <div className="banner-header">
                    <Diamond className="banner-icon" />
                    <h3 className="banner-title">Débloquez plus de statistiques avec Premium !</h3>
                </div>
                <p className="banner-description">
                    Passez à Premium pour accéder à des analyses de données plus approfondies, des périodes de rétention plus
                    longues et des rapports personnalisables.
                </p>
                <button className="premium-button">Passer à Premium</button>
            </div>
        </MainLayout>
    )
}