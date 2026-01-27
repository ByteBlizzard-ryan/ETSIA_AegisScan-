import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssistantIA } from './assistant_ia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssistantIA])],
})
export class AssistantIAModule {}
