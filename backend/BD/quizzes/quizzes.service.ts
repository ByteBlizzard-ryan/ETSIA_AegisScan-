import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quizzes.entity';
import { ReponsePossible } from '../reponses_possibles/reponses_possibles.entity';
import { ReponseUtilisateur } from '../reponses_utilisateur/reponses_utilisateur.entity';
import { UtilisateurService } from '../Utilisateur/utilisateur.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(ReponsePossible)
    private readonly reponsePossibleRepository: Repository<ReponsePossible>,

    @InjectRepository(ReponseUtilisateur)
    private readonly reponseUtilisateurRepository: Repository<ReponseUtilisateur>,

    // Utilisation de forwardRef pour briser la dépendance circulaire
    @Inject(forwardRef(() => UtilisateurService))
    private readonly utilisateurService: UtilisateurService,
  ) {}

  /**
   * Récupère tous les quiz avec leur module associé
   */
  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['module'] });
  }

  /**
   * Récupère un quiz détaillé pour l'affichage (questions + réponses)
   */
  async findOneWithDetails(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id_quiz: id } as any,
      relations: ['questions', 'questions.reponses_possibles', 'module'],
      order: {
        questions: {
          ordre: 'ASC',
        },
      } as any,
    });

    if (!quiz) throw new NotFoundException(`Quiz ${id} introuvable`);
    return quiz;
  }

  /**
   * Enregistre les réponses et vérifie si un badge doit être attribué
   */
  async submitQuiz(
    id_utilisateur: string, 
    id_quiz: string, 
    reponses: { id_question: string; id_reponse_choisie: string }[]
  ) {
    const resultats: ReponseUtilisateur[] = [];

    // 1. Sauvegarde des réponses de l'utilisateur
    for (const item of reponses) {
      const reponsePossible = await this.reponsePossibleRepository.findOne({
        where: { id_reponse: item.id_reponse_choisie } as any,
      });

      const nouvelleReponseUser = new ReponseUtilisateur();
      nouvelleReponseUser.utilisateur = { id_utilisateur: id_utilisateur } as any;
      nouvelleReponseUser.question = { id_question: item.id_question } as any;
      nouvelleReponseUser.reponse_choisie = reponsePossible || null;
      nouvelleReponseUser.est_correcte = reponsePossible ? reponsePossible.est_correcte : false;

      const sauve = await this.reponseUtilisateurRepository.save(nouvelleReponseUser);
      resultats.push(sauve);
    }

    // 2. Vérification du déblocage de badge
    let badgeInfo = null;

    try {
      // On récupère le quiz pour obtenir son id_module
      const quiz = await this.quizRepository.findOne({
        where: { id_quiz: id_quiz } as any,
        relations: ['module'],
      });

      if (quiz && quiz.module) {
        // Utilisation du cast 'as any' pour éviter l'erreur visuelle de l'IDE
        // liée à la résolution circulaire du forwardRef
        badgeInfo = await (this.utilisateurService as any).verifierEtAttribuerBadge(
          id_utilisateur,
          quiz.module.id_module
        );
      }
    } catch (error) {
      // On log l'erreur pour le debug, mais on ne bloque pas la réponse du quiz
      console.error("Erreur lors de la vérification du badge :", error.message);
    }

    // 3. Retour complet vers le client
    return { 
      message: "Quiz soumis avec succès", 
      questions_repondues: resultats.length,
      badge_debloque: badgeInfo // { unlocked: true, badgeName: '...' } ou null
    };
  }
}