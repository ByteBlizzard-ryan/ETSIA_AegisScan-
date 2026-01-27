import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReponsePossible } from './reponses_possibles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReponsePossible])],
})
export class ReponsesPossiblesModule {}
