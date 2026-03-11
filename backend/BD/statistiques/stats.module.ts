import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { AnalysesLien } from 'BD/analyses_lien/analyses_lien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysesLien])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}