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
    color: string;
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
    // Configuration des couleurs pour les 3 niveaux de risque
    const COLORS: Record<string, string> = {
        "sûr": "#10b981",       // Vert
        "suspect": "#f59e0b",   // Jaune/Orange
        "dangereux": "#ef4444", // Rouge
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

    // Filtre de jours avec option "Tous" par défaut
    const [days, setDays] = useState(10000);
    const [hoveredPoint, setHoveredPoint] = useState<{x: number, y: number, data: ChartData} | null>(null);
    const [hoveredSegment, setHoveredSegment] = useState<PieData | null>(null);

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

    // Fonction pour générer le chemin SVG du graphique linéaire avec interactivité
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

    // Fonction pour obtenir les points interactifs du graphique linéaire
    const getInteractivePoints = (data: ChartData[]) => {
        if (!data || data.length < 2) return [];
        const maxVal = Math.max(...data.map(d => d.count), 1);
        return data.map((d, i) => {
            const x = (i / (data.length - 1)) * 400;
            const y = 200 - (d.count / maxVal) * 160 - 20;
            return { x, y, data: d };
        });
    };

    // Fonction pour rendre les segments du donut avec 3 couleurs
    const renderDonutSegments = () => {
        const pieData = stats.pieChart || [];
        const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
        
        if (total === 0) {
            return <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />;
        }

        let offset = 0;

        return pieData.map((item, i) => {
            if (item.value === 0) return null; // Ne pas afficher les segments vides
            
            const percentage = (item.value / total) * 100;
            const dashArray = `${(percentage * 219.9) / 100} 219.9`;
            const dashOffset = (offset * 219.9) / 100;
            offset += percentage;

            const segmentColor = COLORS[item.label.toLowerCase()] || "#6b7280";

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
                    style={{ 
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        opacity: hoveredSegment && hoveredSegment.label !== item.label ? 0.6 : 1
                    }}
                    onMouseEnter={() => setHoveredSegment(item)}
                    onMouseLeave={() => setHoveredSegment(null)}
                />
            );
        });
    };

    return (
        <MainLayout title="Statistiques">
            {/* Header Actions - Filtre avec option "Tous" par défaut */}
            <div className="flex justify-end mb-6">
                <select 
                    className="date-selector bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 cursor-pointer"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                >
                    <option value={10000}>Tous</option>
                    <option value={7}>Derniers 7 jours</option>
                    <option value={30}>Derniers 30 jours</option>
                    <option value={90}>Derniers 90 jours</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <StatCard
                    title="Liens analysés"
                    value={stats.totalLinks ?? 0}
                    subtitle={days === 10000 ? "Historique complet" : `Derniers ${days} jours`}
                    icon={Link2}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Menaces détectées"
                    value={stats.threatsDetected ?? 0}
                    subtitle="Liens suspects et dangereux"
                    icon={ShieldCheck}
                    iconColor="#ef4444"
                />
                <StatCard
                    title="Score de risque moyen"
                    value={stats.averageRiskScore ?? "N/A"}
                    subtitle="Niveau de sécurité"
                    icon={Target}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Taux de protection"
                    value={stats.protectionRate ?? "100%"}
                    subtitle="Liens sûrs détectés"
                    icon={CheckCircle}
                    iconColor="#10b981"
                />
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <div className="chart-card">
                    <h3 className="chart-title">Performance des Liens</h3>
                    <p className="chart-description">
                        Évolution du nombre d'analyses par jour sur la période sélectionnée.
                    </p>
                    <div className="chart-container">
                        <div className="line-chart">
                            <div className="chart-area" style={{ position: 'relative' }}>
                                <svg className="line-chart-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                                    {/* Grille de référence */}
                                    <line x1="0" y1="50" x2="400" y2="50" stroke="#e8ecef" strokeDasharray="4" />
                                    <line x1="0" y1="100" x2="400" y2="100" stroke="#e8ecef" strokeDasharray="4" />
                                    <line x1="0" y1="150" x2="400" y2="150" stroke="#e8ecef" strokeDasharray="4" />
                                    
                                    {/* Ligne du graphique */}
                                    <path
                                        d={getLinePath(stats.lineChart)}
                                        className="chart-line total"
                                        fill="none"
                                        stroke="#4a8a9a"
                                        strokeWidth="3"
                                        style={{ transition: 'd 0.5s ease' }}
                                    />
                                    
                                    {/* Points interactifs */}
                                    {getInteractivePoints(stats.lineChart).map((point, i) => (
                                        <circle
                                            key={i}
                                            cx={point.x}
                                            cy={point.y}
                                            r="4"
                                            fill="#4a8a9a"
                                            stroke="#ffffff"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setHoveredPoint({
                                                    x: rect.left + rect.width / 2,
                                                    y: rect.top,
                                                    data: point.data
                                                });
                                            }}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                        />
                                    ))}
                                </svg>
                                
                                {/* Tooltip pour le graphique linéaire */}
                                {hoveredPoint && (
                                    <div
                                        className="tooltip"
                                        style={{
                                            position: 'fixed',
                                            left: hoveredPoint.x,
                                            top: hoveredPoint.y - 60,
                                            transform: 'translateX(-50%)',
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            color: 'white',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            pointerEvents: 'none',
                                            zIndex: 1000
                                        }}
                                    >
                                        <div>{hoveredPoint.data.date}</div>
                                        <div><strong>{hoveredPoint.data.count} analyses</strong></div>
                                    </div>
                                )}
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
                        Répartition des liens par niveau de risque (Vert: Sûr, Jaune: Suspect, Rouge: Dangereux).
                    </p>
                    <div className="chart-container">
                        <div className="donut-chart-container">
                            <div className="donut-chart" style={{ position: 'relative' }}>
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />
                                    {renderDonutSegments()}
                                </svg>
                                
                                {/* Tooltip pour le donut */}
                                {hoveredSegment && (
                                    <div
                                        className="donut-tooltip"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            color: 'white',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            pointerEvents: 'none',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div>{hoveredSegment.label}</div>
                                        <div><strong>{hoveredSegment.value} liens</strong></div>
                                    </div>
                                )}
                                
                                {/* Légende améliorée */}
                                <div className="donut-labels-list mt-4">
                                    {(stats.pieChart || []).map((item, i) => {
                                        if (item.value === 0) return null;

                                        return (
                                            <div key={i} className="flex justify-between text-xs mb-1">
                                                <div className="flex items-center gap-1">
                                                    <div 
                                                        className="w-2 h-2 rounded-full" 
                                                        style={{ 
                                                            backgroundColor: COLORS[item.label.toLowerCase()] || "#6b7280"
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