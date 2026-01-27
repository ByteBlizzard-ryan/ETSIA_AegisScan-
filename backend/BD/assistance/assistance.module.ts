import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistance } from './assistance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assistance])],
})
export class AssistanceModule {}
