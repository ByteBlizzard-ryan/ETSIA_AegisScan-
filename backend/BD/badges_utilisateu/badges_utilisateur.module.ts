import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgesUtilisateur } from './badges_utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BadgesUtilisateur])],
})
export class BadgesUtilisateurModule {}
