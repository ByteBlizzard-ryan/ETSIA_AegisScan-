import { Injectable, ConflictException, UnauthorizedException,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, Between } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import * as bcrypt from 'bcrypt';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { UpdatePasswordDto } from './modificationMotDePasse/UpdatePasswordDto';
import { AnalysesLien, NiveauRisque, StatutAnalyse } from 'BD/analyses_lien/analyses_lien.entity';
import { Lien } from 'BD/liens/liens.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly repo: Repository<Utilisateur>,
    @InjectRepository(Lien) private readonly lienRepo: Repository<Lien>,
    @InjectRepository(AnalysesLien) private readonly analysesRepo: Repository<AnalysesLien>,
  ) {}

  async register(data: CreateUtilisateurDto) {
    // 1. Vérifier si l'email OU le nom d'utilisateur existe déjà
    const userExists = await this.repo.findOne({
      where: [
        { email: data.email },
        { nom_utilisateur: data.username }
      ]
    });

    if (userExists) {
      if (userExists.email === data.email) {
        throw new ConflictException('Oups, cet email est déjà utilisé !');
      }
      if (userExists.nom_utilisateur === data.username) {
        throw new ConflictException("Ce nom d'utilisateur est déjà pris !");
      }
    }

    // 2. Hacher le mot de passe
    // La méthode hash avec un nombre (10) génère le sel automatiquement en interne
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // 3. Créer l'entité
    const nouvelUtilisateur = this.repo.create({
      nom_utilisateur: data.username,
      email: data.email,
      mot_de_passe_hash: hashedPassword,
      consentement_analyse: data.acceptTerms, 
    });

    // 4. Sauvegarder
    return await this.repo.save(nouvelUtilisateur);
  }

  //Methode pour gérer la modification du mot de passe utilisateur
  async updatePassword(userId: string, data: UpdatePasswordDto) {
    // 1. Rechercher l'utilisateur par son ID (qui vient du Token JWT)
    const user = await this.repo.findOne({ where: { id_utilisateur: userId } });

    if (!user) {
      throw new NotFoundException("Utilisateur non trouvé");
    }

    // 2. Vérifier si l'ancien mot de passe est correct
    // On compare le mot de passe en clair envoyé avec le hash de la DB
    const isMatch = await bcrypt.compare(data.oldPassword, user.mot_de_passe_hash);
    
    if (!isMatch) {
      throw new UnauthorizedException("L'ancien mot de passe est incorrect");
    }

    // 3. Hacher le nouveau mot de passe
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(data.newPassword, saltRounds);

    // 4. Mettre à jour l'entité
 user.mot_de_passe_hash = await bcrypt.hash(data.newPassword, 10);

    // 5. Sauvegarder (TypeORM détecte que l'ID existe et fera un UPDATE)
    await this.repo.save(user);

    return { message: "Mot de passe mis à jour avec succès" };
  }

  //Méthode pour gérer le calcul des statistiques 
  // Inside utilisateur.service.ts
async getStatistics(userId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [totalLinks, threats, avgScoreResult, lineChartData, pieChartData] = await Promise.all([
        // 1. Total Links
        this.lienRepo.count({ where: { utilisateur: { id_utilisateur: userId } } }),

        // 2. Threat Data
        this.analysesRepo.find({
            where: { utilisateur: { id_utilisateur: userId }, niveau_risque: Not(NiveauRisque.SUR) },
            select: ['statut'],
        }),

        // 3. Average Score
        this.analysesRepo.createQueryBuilder('analyse')
            .select('AVG(analyse.score_risque)', 'average')
            .where('analyse.id_utilisateur = :userId', { userId })
            .getRawOne(),

        // 4. Line Chart: Performance (Links per day)
        this.lienRepo.createQueryBuilder('lien')
            .select("DATE_FORMAT(lien.date_ajout, '%Y-%m-%d')", 'date')
            .addSelect('COUNT(*)', 'count')
            .where('lien.id_utilisateur = :userId', { userId })
            .andWhere('lien.date_ajout >= :startDate', { startDate })
            .groupBy('date')
            .orderBy('date', 'ASC')
            .getRawMany(),

        // 5. Pie Chart: Distribution (Threats by severity)
        this.analysesRepo.createQueryBuilder('analyse')
            .select('analyse.niveau_risque', 'label')
            .addSelect('COUNT(*)', 'value')
            .where('analyse.id_utilisateur = :userId', { userId })
            .groupBy('analyse.niveau_risque')
            .getRawMany(),
    ]);

    // Logic for protection rate and formatting
    const totalThreats = threats.length;
    const blockedThreats = threats.filter(t => t.statut === StatutAnalyse.BLOQUE).length;
    const protectionRate = totalThreats > 0 ? Math.round((blockedThreats / totalThreats) * 100) : 100;
    const rawAverage = avgScoreResult?.average;

    return {
        totalLinks,
        threatsDetected: totalThreats,
        averageRiskScore: rawAverage !== null ? `${parseFloat(rawAverage).toFixed(1)}/10` : "N/A",
        protectionRate: `${protectionRate}%`,
        lineChart: lineChartData, // Array of {date, count}
        pieChart: pieChartData,   // Array of {label, value}
    };
}
}