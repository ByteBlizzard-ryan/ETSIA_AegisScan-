import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysesLien } from './analyses_lien.entity';
import { Lien } from '../liens/liens.entity'; 
import { AnalyseLienService } from './analyseLien.service';
import { AnalyseLienController } from './analyselien.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalysesLien, Lien]) 
  ],
  controllers: [AnalyseLienController], // Correctly registers the route
  providers: [AnalyseLienService],      // Correctly registers the logic
  exports: [AnalyseLienService],
})
export class AnalysesLienModule {}