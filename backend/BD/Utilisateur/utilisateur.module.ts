import { Module, forwardRef } from '@nestjs/common'; // Import de forwardRef
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { Lien } from 'BD/liens/liens.entity';
import { AnalysesLien } from 'BD/analyses_lien/analyses_lien.entity';
import { QuizzesModule } from 'BD/quizzes/quizzes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Utilisateur, 
      Lien, 
      AnalysesLien
    ]),
    
    // On renvoie l'ascenseur au QuizzesModule pour briser la boucle d'injection
    forwardRef(() => QuizzesModule),
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService], 
})
export class UtilisateurModule {}