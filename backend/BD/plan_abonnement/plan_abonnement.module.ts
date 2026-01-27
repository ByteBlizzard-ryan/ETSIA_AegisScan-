import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanAbonnement } from './plan_abonnement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanAbonnement])],
  exports: [TypeOrmModule], // pour être utilisé dans d'autres modules si besoin
})
export class PlanAbonnementModule {}
