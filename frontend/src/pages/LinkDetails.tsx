import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { 
    ArrowLeft, 
    Clock, 
    Shield, 
    BarChart3, 
    Calendar,
    Globe,
    Zap,
    AlertTriangle,
    CheckCircle,
    XCircle
} from "lucide-react";

interface LinkDetails {
    lien: {
        id: string;
        url: string;
        url_complete: string;
        source: string;
        logiciel_source: string | null;
        date_ajout: string;
        total_analyses: number;
    };
    statistiques: {
        total_analyses: number;
        score_moyen: number;
        derniere_analyse: string;
        premiere_analyse: string;
        niveau_risque_actuel: string;
        statut_actuel: string;
        temps_analyse_moyen: number;
    };
    repartition: {
        par_canal: Record<string, number>;
        par_niveau_risque: Record<string, number>;
    };
    analyses: Array<{
        id: string;
        date_analyse: string;
        score_risque: number;
        niveau_risque: string;
        verdict: string;
        canal_source: string;
        statut: string;
        temps_analyse_ms: number;
        motifs: string;
        type_analyse: string;
    }>;
}

export default function LinkDetails() {
    const { linkId } = useParams<{ linkId: string }>();
    const navigate = useNavigate();
    const [details, setDetails] = useState<LinkDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!linkId) return;

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/analyse-lien/lien/${linkId}/details`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setDetails(data);
                } else {
                    setError('Impossible de charger les détails du lien');
                }
            } catch (err) {
                setError('Erreur de connexion');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [linkId]);

    const getRiskColor = (niveau: string) => {
        switch (niveau) {
            case 'dangereux': return 'text-red-600 bg-red-50';
            case 'suspect': return 'text-yellow-600 bg-yellow-50';
            case 'sûr': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getRiskIcon = (niveau: string) => {
        switch (niveau) {
            case 'dangereux': return <XCircle className="w-5 h-5" />;
            case 'suspect': return <AlertTriangle className="w-5 h-5" />;
            case 'sûr': return <CheckCircle className="w-5 h-5" />;
            default: return <Shield className="w-5 h-5" />;
        }
    };

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

    if (loading) {
        return (
            <MainLayout title="Chargement..." subtitle="Récupération des détails du lien">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </MainLayout>
        );
    }

    if (error || !details) {
        return (
            <MainLayout title="Erreur" subtitle="Impossible de charger les détails">
                <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Retour au Dashboard
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout 
            title="Détails du lien" 
            subtitle={`Analyse complète de ${details.lien.url.substring(0, 50)}...`}
        >
            {/* Bouton retour */}
            <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 mb-6 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Retour au Dashboard
            </button>

            {/* Informations principales */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${getRiskColor(details.statistiques.niveau_risque_actuel)}`}>
                        {getRiskIcon(details.statistiques.niveau_risque_actuel)}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">
                            {details.lien.url}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Statut actuel:</span>
                                <p className="font-medium">{details.statistiques.statut_actuel}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Score moyen:</span>
                                <p className="font-medium">{details.statistiques.score_moyen}%</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Total analyses:</span>
                                <p className="font-medium">{details.statistiques.total_analyses}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Source:</span>
                                <p className="font-medium">{details.lien.source}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explication du score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Explication du score de sécurité
                </h3>
                <p className="text-blue-700 text-sm">
                    {getScoreExplanation(details.statistiques.score_moyen)}
                </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Dates importantes */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Chronologie
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-gray-500">Première analyse:</span>
                            <p className="font-medium">
                                {new Date(details.statistiques.premiere_analyse).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Dernière analyse:</span>
                            <p className="font-medium">
                                {new Date(details.statistiques.derniere_analyse).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Ajouté le:</span>
                            <p className="font-medium">
                                {new Date(details.lien.date_ajout).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Répartition par canal */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        Sources d'analyse
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(details.repartition.par_canal).map(([canal, count]) => (
                            <div key={canal} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{canal}</span>
                                <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        Performance
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-gray-500">Temps moyen d'analyse:</span>
                            <p className="font-medium">
                                {details.statistiques.temps_analyse_moyen}ms
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500">Logiciel source:</span>
                            <p className="font-medium">
                                {details.lien.logiciel_source || 'Non spécifié'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Historique des analyses */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Historique des analyses ({details.analyses.length})
                </h3>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-2">Date</th>
                                <th className="text-left py-3 px-2">Score</th>
                                <th className="text-left py-3 px-2">Niveau</th>
                                <th className="text-left py-3 px-2">Canal</th>
                                <th className="text-left py-3 px-2">Temps</th>
                                <th className="text-left py-3 px-2">Motifs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.analyses.map((analyse) => (
                                <tr key={analyse.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-2">
                                        {new Date(analyse.date_analyse).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            analyse.score_risque > 50 ? 'bg-red-100 text-red-800' :
                                            analyse.score_risque > 10 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {analyse.score_risque}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(analyse.niveau_risque)}`}>
                                            {analyse.niveau_risque}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-gray-600">
                                        {analyse.canal_source}
                                    </td>
                                    <td className="py-3 px-2 text-gray-600">
                                        {analyse.temps_analyse_ms}ms
                                    </td>
                                    <td className="py-3 px-2 text-gray-600 max-w-xs truncate" title={analyse.motifs}>
                                        {analyse.motifs}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}