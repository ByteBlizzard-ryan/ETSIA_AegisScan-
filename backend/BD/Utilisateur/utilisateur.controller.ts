import { Controller, Post, Body, Req,UseGuards,Patch,Get, Query } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './create-utilisateur.dto'; // <-- 1. Importe le DTO
import { UpdatePasswordDto } from './modificationMotDePasse/UpdatePasswordDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post('auth/register')
  // 2. Remplace 'any' par 'CreateUtilisateurDto'
  async register(@Body() body: CreateUtilisateurDto) { 
    return this.utilisateurService.register(body);
  }

  
  @UseGuards(JwtAuthGuard) // Seuls les gens connectés peuvent entrer
  @Patch('utilisateurs/change-password') // Définit la fin : /change-password
  async changePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    // req.user.id vient de ton JWT (ton token de connexion)
    console.log("DEBUG: Current user from Request:", req.user);

    const userId = req.user.id_utilisateur; 
    
    return this.utilisateurService.updatePassword(userId, updatePasswordDto);
  }

 @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getUserStats(@Req() req, @Query('days') days: string) {
      const userId = req.user.id_utilisateur;
      const daysCount = days ? parseInt(days) : 7; // Default to 7 days
      return await this.utilisateurService.getStatistics(userId, daysCount);
  }

}
