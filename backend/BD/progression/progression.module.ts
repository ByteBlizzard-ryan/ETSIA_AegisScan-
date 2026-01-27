import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progression } from './progression.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progression])],
})
export class ProgressionModule {}
