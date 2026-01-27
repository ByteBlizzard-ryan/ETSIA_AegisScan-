import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessions } from './user_sessions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSessions])],
})
export class UserSessionsModule {}
