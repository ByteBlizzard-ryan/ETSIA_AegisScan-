import { Controller, Post, Body, Req, UseGuards, Patch, Get, Query } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './create-utilisateur.dto';
import { UpdatePasswordDto } from './modificationMotDePasse/UpdatePasswordDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller() 
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  /**
   * Inscription d'un nouvel utilisateur
   * Route: POST /auth/register
   */
  @Post('auth/register')
  async register(@Body() body: CreateUtilisateurDto) { 
    return this.utilisateurService.register(body);
  }

  /**
   * Modification du mot de passe (nécessite d'être connecté)
   * Route: PATCH /utilisateurs/change-password
   */
  @UseGuards(JwtAuthGuard)
  @Patch('utilisateurs/change-password')
  async changePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    // On récupère l'ID utilisateur injecté dans la requête par le JwtAuthGuard
    const userId = req.user.id_utilisateur; 
    return this.utilisateurService.updatePassword(userId, updatePasswordDto);
  }

  // --- SECTION STATISTIQUES ---

  /**
   * Statistiques générales de sécurité (liens analysés, menaces...)
   * Route: GET /stats?days=7
   */
  @UseGuards(JwtAuthGuard)
  @Get('stats') 
  async getUserStats(@Req() req, @Query('days') days: string) {
      const userId = req.user.id_utilisateur;
      const daysCount = days ? parseInt(days) : 7;
      return await this.utilisateurService.getStatistics(userId, daysCount);
  }

  /**
   * Historique et scores des derniers quiz effectués
   * Route: GET /stats/quiz
   */
  @UseGuards(JwtAuthGuard)
  @Get('stats/quiz')
  async getQuizStats(@Req() req) {
    const userId = req.user.id_utilisateur;
    return await this.utilisateurService.getStatisticsQuiz(userId);
  }

  // --- SECTION RÉCOMPENSES (BADGES) ---

  /**
   * Récupère la liste des badges obtenus par l'utilisateur connecté
   * Route: GET /utilisateur/mes-badges
   */
  @UseGuards(JwtAuthGuard)
  @Get('utilisateur/mes-badges')
  async getMyBadges(@Req() req) {
    // L'ID vient du token JWT décodé
    const userId = req.user.id_utilisateur;
    return await this.utilisateurService.getMesBadges(userId);
  }
}