import { Module, forwardRef } from '@nestjs/common'; // Import de forwardRef
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quizzes.entity';
import { Question } from '../questions/questions.entity';
import { ReponsePossible } from '../reponses_possibles/reponses_possibles.entity';
import { ReponseUtilisateur } from '../reponses_utilisateur/reponses_utilisateur.entity';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { UtilisateurModule } from '../Utilisateur/utilisateur.module'; // Import du module Utilisateur

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz, 
      Question, 
      ReponsePossible, 
      ReponseUtilisateur
    ]),
    
    // Utilisation de forwardRef pour permettre à QuizzesService 
    // d'utiliser UtilisateurService sans créer de boucle infinie au démarrage
    forwardRef(() => UtilisateurModule),
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService], 
})
export class QuizzesModule {}