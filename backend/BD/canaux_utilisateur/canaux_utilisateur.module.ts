import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanauxUtilisateur } from './canaux_utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CanauxUtilisateur])],
  exports: [TypeOrmModule], // pour pouvoir l'utiliser dans d'autres modules
})
export class CanauxUtilisateurModule {}
