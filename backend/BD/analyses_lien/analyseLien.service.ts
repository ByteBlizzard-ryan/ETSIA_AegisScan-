import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import * as crypto from 'crypto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Lien } from 'BD/liens/liens.entity';
import { AnalysesLien, NiveauRisque, StatutAnalyse } from 'BD/analyses_lien/analyses_lien.entity';
import { performance } from 'perf_hooks';

@Injectable()
export class AnalyseLienService {

  getStatistics(id_utilisateur: any) {
    // Retourne quelques statistiques rapides pour le tableau de bord
    // total analyses, nombre de liens dangereux, suspect et sûrs
    return this.analyseRepo
      .createQueryBuilder('analyse')
      .select('COUNT(analyse.id_analyse)', 'total')
      .addSelect("SUM(CASE WHEN analyse.niveau_risque = 'DANGEREUX' THEN 1 ELSE 0 END)", 'dangerous')
      .addSelect("SUM(CASE WHEN analyse.niveau_risque = 'SUSPECT' THEN 1 ELSE 0 END)", 'suspect')
      .addSelect("SUM(CASE WHEN analyse.niveau_risque = 'SUR' THEN 1 ELSE 0 END)", 'safe')
      .where('analyse.utilisateur = :uid', { uid: id_utilisateur })
      .getRawOne();
  }
  constructor(
    @InjectRepository(Lien)
    private readonly lienRepo: Repository<Lien>,
    @InjectRepository(AnalysesLien)
    private readonly analyseRepo: Repository<AnalysesLien>,
    private readonly configService: ConfigService,
  ) {}

  async analyzeLink(url: string, user: any, canalSource: string) {
    const startTime = performance.now();
    const urlHash = crypto.createHash('sha256').update(url).digest('hex');

    // 1 & 2. Cache check (Inchangé)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingAnalysis = await this.analyseRepo.findOne({
      where: { lien: { url_hash: urlHash }, date_analyse: MoreThan(oneDayAgo) },
      relations: ['lien'],
      order: { date_analyse: 'DESC' }
    });

    if (existingAnalysis) {
      existingAnalysis.lien.total_analyses += 1;
      await this.lienRepo.save(existingAnalysis.lien);

      const cachedAnalyse = this.analyseRepo.create({
        lien: existingAnalysis.lien,
        utilisateur: user,
        score_risque: existingAnalysis.score_risque,
        niveau_risque: existingAnalysis.niveau_risque,
        analyse_verdict_final: existingAnalysis.analyse_verdict_final,
        type_analyse: 'Cache (VirusTotal)',
        temps_analyse_ms: 0,
        canal_source: this.formatCanalSource(canalSource),
        statut: existingAnalysis.statut,
        motifs: existingAnalysis.motifs,
      });

      const savedAnalyse = await this.analyseRepo.save(cachedAnalyse);
      return { 
        ...await this.analyseRepo.findOne({
          where: { id_analyse: savedAnalyse.id_analyse },
          relations: ['lien', 'utilisateur']
        }), 
        cached: true 
      };
    }

    // 3. Find/Create Lien avec canal source amélioré
    let lien = await this.lienRepo.findOne({ where: { url_hash: urlHash } });
    if (!lien) {
      lien = this.lienRepo.create({
        url: url,
        url_complete: url,
        url_hash: urlHash,
        source: this.determineSource(canalSource),
        logiciel_source: this.determineLogicielSource(canalSource),
        utilisateur: user,
        total_analyses: 0
      });
      await this.lienRepo.save(lien);
    }

    // 4. APPEL VIRUSTOTAL + DEBUG
    const apiKey = this.configService.get<string>('VIRUSTOTAL_API_KEY');
    const urlId = Buffer.from(url).toString('base64').replace(/=/g, '');
    
    let maliciousCount = 0;
    let totalEngines = 0;

    try {
      console.log(`\n--- DEBUG ANALYSE : ${url} ---`);
      const vtResponse = await axios.get(
        `https://www.virustotal.com/api/v3/urls/${urlId}`,
        { headers: { 'x-apikey': apiKey } }
      );

      const stats = vtResponse.data.data.attributes.last_analysis_stats;
      
      // LOGS DE DEBUGGING
      console.log("Stats brutes de VT:", stats);
      
      maliciousCount = stats.malicious;
      totalEngines = stats.malicious + stats.harmless + stats.suspicious + stats.undetected;
      
      console.log(`Résultat : ${maliciousCount} positifs sur ${totalEngines} moteurs.`);
    } catch (error) {
      console.error("--- ERREUR CRITIQUE VT ---");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Message API:", error.response.data?.error?.message);
      } else {
        console.error("Erreur réseau/interne:", error.message);
      }
    }

    const score = totalEngines > 0 ? (maliciousCount / totalEngines) * 100 : 0;
    console.log("Score final calculé:", score.toFixed(2) + "%");
    console.log("----------------------------\n");

    // 5. LOGIQUE MÉTIER
    let niveau: NiveauRisque;
    let verdict: string;
    let statut: StatutAnalyse;

    if (score > 50 || maliciousCount >= 3) { 
      niveau = NiveauRisque.DANGEREUX;
      verdict = 'Lien dangereux';
      statut = StatutAnalyse.BLOQUE;
    } else if (score > 10 || maliciousCount >= 1) {
      niveau = NiveauRisque.SUSPECT;
      verdict = 'Lien suspect';
      statut = StatutAnalyse.AUTORISE;
    } else {
      niveau = NiveauRisque.SUR;
      verdict = 'Lien sûr';
      statut = StatutAnalyse.AUTORISE;
    }

    // 6 & 7. Sauvegarde avec canal source amélioré
    const newAnalyse = this.analyseRepo.create({
      lien,
      utilisateur: user,
      score_risque: parseFloat(score.toFixed(2)), // Score précis avec 2 décimales
      niveau_risque: niveau,
      analyse_verdict_final: verdict,
      type_analyse: 'VirusTotal API',
      temps_analyse_ms: Math.round(performance.now() - startTime),
      canal_source: this.formatCanalSource(canalSource),
      statut,
      motifs: this.generateMotifs(maliciousCount, totalEngines, score)
    });

    // Incrémenter le compteur d'analyses du lien
    lien.total_analyses += 1;
    await this.lienRepo.save(lien);
    
    const savedAnalyse = await this.analyseRepo.save(newAnalyse);
    
    // Retourner l'analyse avec les relations chargées
    return await this.analyseRepo.findOne({
      where: { id_analyse: savedAnalyse.id_analyse },
      relations: ['lien', 'utilisateur']
    });
  }

  // Méthodes utilitaires pour améliorer la gestion des sources
  private determineSource(canalSource: string): string {
    if (canalSource.includes('Extension')) return 'Extension Navigateur';
    if (canalSource.includes('Dashboard') || canalSource.includes('Web')) return 'Application Web';
    if (canalSource.includes('WhatsApp')) return 'WhatsApp';
    if (canalSource.includes('Telegram')) return 'Telegram';
    if (canalSource.includes('Email')) return 'Email';
    if (canalSource.includes('SMS')) return 'SMS';
    return 'Autre';
  }

  private determineLogicielSource(canalSource: string): string | null {
    if (canalSource.includes('Chrome')) return 'Google Chrome';
    if (canalSource.includes('Firefox')) return 'Mozilla Firefox';
    if (canalSource.includes('Safari')) return 'Safari';
    if (canalSource.includes('Edge')) return 'Microsoft Edge';
    if (canalSource.includes('WhatsApp')) return 'WhatsApp';
    if (canalSource.includes('Telegram')) return 'Telegram';
    return null;
  }

  private formatCanalSource(canalSource: string): string {
    // Nettoyer et formater le canal source pour l'affichage
    return canalSource
      .replace('Extension Navigateur', 'Extension Chrome')
      .replace('Web Dashboard', 'Application Web')
      .replace('(Direct)', '(Connexion directe)');
  }

  private generateMotifs(maliciousCount: number, totalEngines: number, score: number): string {
    const motifs: string[] = [];
    
    if (maliciousCount > 0) {
      motifs.push(`${maliciousCount} moteur(s) de sécurité ont détecté des menaces`);
    }
    
    if (score > 50) {
      motifs.push('Score de risque élevé (>50%)');
    } else if (score > 10) {
      motifs.push('Score de risque modéré (>10%)');
    } else {
      motifs.push('Aucune menace détectée par les moteurs de sécurité');
    }
    
    motifs.push(`Analysé par ${totalEngines} moteur(s) de sécurité`);
    
    return motifs.join('; ');
  }
  // Pour l'affichage de l'historique des analyses dans le dashboard
  async getUserHistory(userId: string) {
    return await this.analyseRepo.find({
      where: { utilisateur: { id_utilisateur: userId } },
      relations: ['lien'],
      order: { date_analyse: 'DESC' },
      take: 10
    });
  }

  // Détails complets d'un lien spécifique pour le modal
  async getLinkDetails(linkId: string, userId: string) {
    return await this.analyseRepo.find({
      where: {
        lien: { id_lien: linkId },
        utilisateur: { id_utilisateur: userId }
      },
      relations: ['lien', 'utilisateur'],
      order: { date_analyse: 'DESC' }
    });
  }

  // Statistiques globales de l'utilisateur (totalLinks, threatsDetected)
  async getUserStats(userId: string) {
    const total = await this.analyseRepo.count({
      where: { utilisateur: { id_utilisateur: userId } }
    });

    const threats = await this.analyseRepo.count({
      where: {
        utilisateur: { id_utilisateur: userId },
        niveau_risque: NiveauRisque.DANGEREUX
      }
    });

    // Compter les liens bloqués (statut BLOQUE)
    const blocked = await this.analyseRepo.count({
      where: {
        utilisateur: { id_utilisateur: userId },
        statut: StatutAnalyse.BLOQUE
      }
    });

    return {
      totalLinks: total,
      threatsDetected: threats,
      linksBlocked: blocked
    };
  }

  // Nouvelle méthode pour bloquer un lien et ignorer l'avertissement
  async blockLinkAndIgnoreWarning(linkId: string, userId: string, motifIgnore: string) {
    // Trouver la dernière analyse du lien pour cet utilisateur
    const lastAnalysis = await this.analyseRepo.findOne({
      where: {
        lien: { id_lien: linkId },
        utilisateur: { id_utilisateur: userId }
      },
      relations: ['lien', 'utilisateur'],
      order: { date_analyse: 'DESC' }
    });

    if (!lastAnalysis) {
      throw new Error('Aucune analyse trouvée pour ce lien');
    }

    // Créer une nouvelle analyse avec statut bloqué et motif d'ignorance
    const newAnalyse = this.analyseRepo.create({
      lien: lastAnalysis.lien,
      utilisateur: lastAnalysis.utilisateur,
      score_risque: lastAnalysis.score_risque,
      niveau_risque: NiveauRisque.SUSPECT, // Marquer comme suspect car ignoré
      analyse_verdict_final: 'Lien suspect ignoré par l\'utilisateur',
      type_analyse: 'Action utilisateur',
      temps_analyse_ms: 0,
      canal_source: 'Interface utilisateur',
      statut: StatutAnalyse.BLOQUE,
      motifs: `Lien signalé suspect et ignoré par l'utilisateur. Motif original: ${lastAnalysis.motifs}. Raison de l'ignorance: ${motifIgnore}`
    });

    // Incrémenter le compteur d'analyses du lien
    lastAnalysis.lien.total_analyses += 1;
    await this.lienRepo.save(lastAnalysis.lien);

    return await this.analyseRepo.save(newAnalyse);
  }
}
