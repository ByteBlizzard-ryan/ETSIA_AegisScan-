import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { AnalyseLienService } from './analyseLien.service';
import { AnalyseLienDto } from './analyselien.dto';
import { JwtAuthGuard } from '../Utilisateur/jwt-auth.guard';

@Controller('analyse-lien')
export class AnalyseLienController {
  constructor(private readonly analyseService: AnalyseLienService) {}

  @UseGuards(JwtAuthGuard)
  @Post('process')
  async handleAnalysis(@Body() dto: AnalyseLienDto, @Req() req) {
    const user = req.user; 
    
    return await this.analyseService.analyzeLink(
      dto.url, 
      user,
      dto.canal_source || 'Web Dashboard'
    );
  }

  // Affichage de l'historique des analyses pour l'utilisateur connecté dans le dashboard
  @UseGuards(JwtAuthGuard)
  @Get('historique')
  async getHistorique(@Req() req) {
    const userId = req.user.id_utilisateur;
    return await this.analyseService.getUserHistory(userId);
  }

  // Nouvelle route pour obtenir les détails complets d'un lien
  @UseGuards(JwtAuthGuard)
  @Get('lien/:linkId/details')
  async getLinkDetails(@Param('linkId') linkId: string, @Req() req) {
    const userId = req.user.id_utilisateur;
    return await this.analyseService.getLinkDetails(linkId, userId);
  }

  // Nouvelle route pour obtenir les statistiques de l'utilisateur
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getUserStats(@Req() req) {
    const userId = req.user.id_utilisateur;
    return await this.analyseService.getUserStats(userId);
  }
}