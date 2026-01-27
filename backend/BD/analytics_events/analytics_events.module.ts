import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsEvents } from './analytics_events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvents])],
})
export class AnalyticsEventsModule {}
