import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReponseUtilisateur } from './reponses_utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReponseUtilisateur])],
})
export class ReponsesUtilisateurModule {}
