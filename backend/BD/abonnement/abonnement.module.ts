import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abonnement } from './abonnement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abonnement])],
  exports: [TypeOrmModule],
})
export class AbonnementModule {}
