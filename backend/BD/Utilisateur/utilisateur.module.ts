import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller'
import { Lien } from 'BD/liens/liens.entity';
import { AnalysesLien } from 'BD/analyses_lien/analyses_lien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur,Lien,AnalysesLien ])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService], 
})
export class UtilisateurModule {}