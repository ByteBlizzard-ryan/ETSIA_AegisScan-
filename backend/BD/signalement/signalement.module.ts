import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signalement } from './signalement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Signalement])],
  exports: [TypeOrmModule],
})
export class SignalementModule {}
