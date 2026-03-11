import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../Utilisateur/jwt-auth.guard';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getStats(@Req() req, @Query('days') days: string) {
    const userId = req.user.id_utilisateur;
    const daysNum = parseInt(days) || 7;
    return await this.statsService.getGlobalStats(userId, daysNum);
  }
}