import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysesLien } from './analyses_lien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysesLien])],
  exports: [TypeOrmModule],
})
export class AnalysesLienModule {}
