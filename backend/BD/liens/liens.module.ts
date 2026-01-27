import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lien } from './liens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lien])],
  exports: [TypeOrmModule],
})
export class LiensModule {}
