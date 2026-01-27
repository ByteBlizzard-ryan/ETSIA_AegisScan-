import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quizzes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  exports: [TypeOrmModule],
})
export class QuizzesModule {}
