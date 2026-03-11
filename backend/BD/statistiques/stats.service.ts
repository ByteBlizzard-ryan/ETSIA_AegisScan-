import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AnalysesLien, NiveauRisque } from 'BD/analyses_lien/analyses_lien.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(AnalysesLien)
    private readonly analyseRepo: Repository<AnalysesLien>,
  ) {}

  async getGlobalStats(userId: string, days: number) {
    try {
      // 1. Calcul de la date de début (Minuit pour inclure toute la journée)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (days - 1));
      startDate.setHours(0, 0, 0, 0);

      // 2. Récupération des analyses via QueryBuilder pour plus de précision avec Postgres
      const analyses = await this.analyseRepo.find({
        where: {
          utilisateur: { id_utilisateur: userId },
          date_analyse: Between(startDate, new Date()),
        },
        order: { date_analyse: 'ASC' },
      });

      // 3. Calculs des métriques de base
      const totalLinks = analyses.length;
      
      // Conversion explicite en Number pour éviter les problèmes de type Decimal de Postgres
      const sumRisk = analyses.reduce((acc, curr) => acc + Number(curr.score_risque || 0), 0);
      const averageRiskScore = totalLinks > 0 ? (sumRisk / totalLinks).toFixed(1) : 0;

      const threatsDetected = analyses.filter(a => 
        a.niveau_risque === NiveauRisque.DANGEREUX || a.niveau_risque === NiveauRisque.SUSPECT
      ).length;

      // 4. Distribution pour le Pie Chart
      const pieChart = [
        { label: 'Sûr', value: analyses.filter(a => a.niveau_risque === NiveauRisque.SUR).length },
        { label: 'Suspect', value: analyses.filter(a => a.niveau_risque === NiveauRisque.SUSPECT).length },
        { label: 'Dangereux', value: analyses.filter(a => a.niveau_risque === NiveauRisque.DANGEREUX).length },
      ];

      // 5. Préparation du Line Chart (Activité par jour)
      // On initialise le map avec des 0 pour chaque jour de la période
      const dailyMap = new Map<string, number>();
      for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const isoDate = d.toISOString().split('T')[0];
        dailyMap.set(isoDate, 0);
      }

      // On remplit avec les données réelles
      analyses.forEach(a => {
        // On s'assure que l'objet date est valide avant le split
        const dateObj = typeof a.date_analyse === 'string' ? new Date(a.date_analyse) : a.date_analyse;
        const dateKey = dateObj.toISOString().split('T')[0];
        
        if (dailyMap.has(dateKey)) {
          dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + 1);
        }
      });

      // Conversion du Map en tableau d'objets trié par date
      const lineChart = Array.from(dailyMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return {
        totalLinks,
        threatsDetected,
        averageRiskScore,
        protectionRate: totalLinks > 0 ? "98.5%" : "100%", // Exemple de calcul factice ou fixe
        pieChart,
        lineChart,
      };
    } catch (error) {
      console.error("Erreur détaillée StatsService:", error);
      throw error;
    }
  }
}