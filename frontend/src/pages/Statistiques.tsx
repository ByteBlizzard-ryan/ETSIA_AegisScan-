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

    const COLORS_PERMANENT: Record<string, string> = {
    "sûr": "#10b981",       // Vert (Permanent)
    "suspect": "#f59e0b",    // Orange (Permanent)
    "dangereux": "#ef4444",  // Rouge (Permanent)
    "default": "#94a3b8"     // Gris (Si label inconnu)
    };

    // 2. Initialize state with full structure
    const [stats, setStats] = useState<StatsState>({
        totalLinks: 0,
        threatsDetected: 0,
        averageRiskScore: "N/A",
        protectionRate: "100%",
        lineChart: [], 
        pieChart: []   
    });

    const [days, setDays] = useState(7);

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
                    // Fallback to empty arrays if backend keys are missing
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
            const y = 200 - (d.count / maxVal) * 160 - 20; // Scale with padding
            return `${x},${y}`;
        });
        return `M ${points.join(" L ")}`;
    };

        const renderDonutSegments = () => {
        const pieData = stats.pieChart || [];
        const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
        if (total === 0) return <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />;

        let offset = 0;

        return pieData.map((item, i) => {
            const percentage = (item.value / total) * 100;
            const dashArray = `${(percentage * 219.9) / 100} 219.9`;
            const dashOffset = (offset * 219.9) / 100;
            offset += percentage;

            // FORCE LA COULEUR : On cherche le label dans notre dictionnaire
            // .toLowerCase() permet d'être sûr que "Sûr" ou "sûr" fonctionne
            const segmentColor = COLORS_PERMANENT[item.label.toLowerCase()] || COLORS_PERMANENT.default;

            return (
                <circle
                    key={`segment-${item.label}-${i}`}
                    cx="50"
                    cy="50"
                    r="35"
                    stroke={segmentColor} // Utilise la couleur fixe
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
            {/* Header Actions */}
            <div className="flex justify-end mb-6">
                <select className="date-selector bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 cursor-pointer"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}>
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
                    subtitle="Depuis le début"
                    icon={Link2}
                    iconColor="#4a8a9a"
                />
                <StatCard
                    title="Menaces détectées"
                    value={stats.threatsDetected ?? 0}
                    subtitle="Activité totale"
                    icon={ShieldCheck}
                    iconColor="#1a9a7a"
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
                    iconColor="#1a9a7a"
                />
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                {/* Line Chart */}
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
                                        <span key={i}>{d.date.split('-').slice(2)}</span>
                                    ))
                                ) : (
                                    <span>-</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">Distribution des Menaces</h3>
                    <p className="chart-description">
                        Répartition par niveau de gravité.
                    </p>
                    <div className="chart-container">
                        <div className="donut-chart-container">
                            <div className="donut-chart">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="35" stroke="#e8ecef" strokeWidth="20" fill="none" />
                                    {renderDonutSegments()}
                                </svg>
                                <div className="donut-labels-list mt-4">
                                    {(stats.pieChart || []).map((item, i) => (
                                        <div key={i} className="flex justify-between text-xs mb-1">
                                            <div className="flex items-center gap-1">
                                                <div 
                                                    className="w-2 h-2 rounded-full" 
                                                    style={{ 
                                                        // On utilise la même logique de couleur ici
                                                        backgroundColor: COLORS_PERMANENT[item.label.toLowerCase()] || COLORS_PERMANENT.default 
                                                    }}
                                                ></div>
                                                <span className="capitalize">{item.label}</span>
                                            </div>
                                            <span className="font-bold">{item.value}</span>
                                        </div>
                                    ))}
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