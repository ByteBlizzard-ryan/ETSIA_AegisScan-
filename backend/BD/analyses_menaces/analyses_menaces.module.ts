import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysesMenaces } from './analyses_menaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysesMenaces])],
  exports: [TypeOrmModule],
})
export class AnalysesMenacesModule {}
