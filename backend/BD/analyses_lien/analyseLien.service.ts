import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import * as crypto from 'crypto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Lien } from 'BD/liens/liens.entity';
import { AnalysesLien, NiveauRisque, StatutAnalyse } from 'BD/analyses_lien/analyses_lien.entity';

// ... (imports identiques)

@Injectable()
export class AnalyseLienService {
  getStatistics(id_utilisateur: any) {
    throw new Error('Method not implemented.');
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
    if (existingAnalysis) return { ...existingAnalysis, cached: true };

    // 3. Find/Create Lien (Inchangé)
    let lien = await this.lienRepo.findOne({ where: { url_hash: urlHash } });
    if (!lien) {
      lien = this.lienRepo.create({
        url: url,
        url_complete: url,
        url_hash: urlHash,
        source: 'Dashboard Analysis',
        utilisateur: user,
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

    // 6 & 7. Sauvegarde (Inchangé)
    const newAnalyse = this.analyseRepo.create({
      lien,
      utilisateur: user,
      score_risque: Math.round(score),
      niveau_risque: niveau,
      analyse_verdict_final: verdict,
      type_analyse: 'VirusTotal API',
      temps_analyse_ms: Math.round(performance.now() - startTime),
      canal_source: canalSource,
      statut,
    });

    lien.total_analyses += 1;
    await this.lienRepo.save(lien);
    return await this.analyseRepo.save(newAnalyse);
  }
// Pour l'affichage de l'historique des analyses dans le dashboard
    async getUserHistory(userId: string) {
    return await this.analyseRepo.find({
      where: { utilisateur: { id_utilisateur: userId } },
      relations: ['lien'], // Pour récupérer l'objet 'lien' et donc son URL
      order: { date_analyse: 'DESC' }, // Les plus récentes en premier
    });
  }
}