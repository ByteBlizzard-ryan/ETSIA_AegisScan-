import { Controller, Post, Body } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './create-utilisateur.dto'; // <-- 1. Importe le DTO

@Controller('auth')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post('register')
  // 2. Remplace 'any' par 'CreateUtilisateurDto'
  async register(@Body() body: CreateUtilisateurDto) { 
    return this.utilisateurService.register(body);
  }
}