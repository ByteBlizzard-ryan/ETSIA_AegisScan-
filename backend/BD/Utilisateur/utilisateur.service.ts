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

        this.lienRepo.createQueryBuilder('lien')
            // Utilise TO_CHAR au lieu de DATE_FORMAT
            .select("TO_CHAR(lien.date_ajout, 'YYYY-MM-DD')", 'date') 
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

    async getStatisticsQuiz(userId: string) {
    const history = await this.repo.manager.query(`
      WITH derniere_tentative AS (
        -- On identifie la date la plus récente pour chaque quiz fait par l'utilisateur
        SELECT id_question, MAX(date_reponse) as max_date
        FROM "reponses_utilisateur"
        WHERE id_utilisateur = $1
        GROUP BY id_question
      )
      SELECT 
        q.id_quiz,
        q.titre AS "quiz_titre",
        q.nb_questions AS "total_questions",
        -- On compte seulement les bonnes réponses de la DERNIÈRE tentative
        COUNT(ru.id_reponse_user) FILTER (WHERE ru.est_correcte = true) AS "score_obtenu",
        MAX(ru.date_reponse) AS "date"
      FROM "reponses_utilisateur" ru
      INNER JOIN derniere_tentative dt ON ru.id_question = dt.id_question AND ru.date_reponse = dt.max_date
      INNER JOIN "questions" ques ON ru.id_question = ques.id_question
      INNER JOIN "quizzes" q ON ques.id_quiz = q.id_quiz
      WHERE ru.id_utilisateur = $1
      GROUP BY q.id_quiz, q.titre, q.nb_questions
      ORDER BY "date" DESC
    `, [userId]);

    return { history };
  }

  
  // Dans utilisateur.service.ts

async verifierEtAttribuerBadge(userId: string, moduleId: string) {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM "quizzes" WHERE "id_module" = $2) as total_quizzes,
      (
        SELECT COUNT(DISTINCT q.id_quiz)
        FROM "quizzes" q
        JOIN "questions" ques ON q.id_quiz = ques.id_quiz
        JOIN "reponses_utilisateur" ru ON ques.id_question = ru.id_question
        WHERE q."id_module" = $2 
        AND ru."id_utilisateur" = $1
        AND ru."est_correcte" = true
        GROUP BY q.id_quiz
        HAVING COUNT(ru.id_reponse_user) = ( -- Utilisation de id_reponse_user ici
            SELECT COUNT(*) FROM "questions" WHERE id_quiz = q.id_quiz
        )
      ) as quizzes_parfaits
  `;

  try {
    const stats = await this.repo.manager.query(query, [userId, moduleId]);
    console.log("DEBUG STATS (Badge) :", stats);

    if (stats.length > 0 && stats[0].total_quizzes !== null) {
      const total = parseInt(stats[0].total_quizzes);
      const parfaits = stats[0].quizzes_parfaits ? parseInt(stats[0].quizzes_parfaits) : 0;

      if (total > 0 && parfaits === total) {
        // 1. Chercher le badge lié à ce module
        const badge = await this.repo.manager.query(
          `SELECT id_badge, nom_badge, icone FROM "badges" WHERE "id_module" = $1 LIMIT 1`,
          [moduleId]
        );

        if (badge.length > 0) {
          const idBadge = badge[0].id_badge;
          
          // 2. Vérifier si l'utilisateur ne l'a pas déjà
          const dejaPossede = await this.repo.manager.query(
            `SELECT 1 FROM "badges_utilisateur" WHERE "id_utilisateur" = $1 AND "id_badge" = $2`,
            [userId, idBadge]
          );

          if (dejaPossede.length === 0) {
            // 3. Attribution automatique
            await this.repo.manager.query(
              `INSERT INTO "badges_utilisateur" ("id_utilisateur", "id_badge", "date_obtention") VALUES ($1, $2, NOW())`,
              [userId, idBadge]
            );
            console.log(`✅ Badge "${badge[0].nom_badge}" attribué à l'utilisateur ${userId}`);
            return { unlocked: true, badgeName: badge[0].nom_badge, icone: badge[0].icone };
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Erreur SQL dans verifierEtAttribuerBadge :", error.message);
  }
  return { unlocked: false };
}
/**
 * Récupère tous les badges débloqués par un utilisateur spécifique
 */
async getMesBadges(userId: string) {
  // Utilisation de query() car c'est une requête sur une table de liaison
  // On s'assure de récupérer 'icone' qui contient l'URL de l'image
  const query = `
    SELECT 
      b.id_badge, 
      b.nom_badge, 
      b.description, 
      b.icone, 
      bu.date_obtention
    FROM "badges" b
    INNER JOIN "badges_utilisateur" bu ON b.id_badge = bu.id_badge
    WHERE bu.id_utilisateur = $1
    ORDER BY bu.date_obtention DESC
  `;

  return await this.repo.manager.query(query, [userId]);
}
}