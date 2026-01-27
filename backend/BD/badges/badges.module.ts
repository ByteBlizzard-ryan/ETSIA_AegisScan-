import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './badges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
})
export class BadgesModule {}
