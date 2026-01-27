import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeMenace } from './type_menace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeMenace])],
  exports: [TypeOrmModule],
})
export class TypeMenaceModule {}
