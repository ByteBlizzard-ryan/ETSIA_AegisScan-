import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AnalyseLienService } from './analyseLien.service';
import { AnalyseLienDto } from './analyselien.dto';
import { JwtAuthGuard } from '../Utilisateur/jwt-auth.guard';

@Controller('analyse-lien')
export class AnalyseLienController {
  constructor(private readonly analyseService: AnalyseLienService) {}

  @UseGuards(JwtAuthGuard) // <--- C'est ce Guard qui récupère ton UUID
  @Post('process')
  async handleAnalysis(@Body() dto: AnalyseLienDto, @Req() req) {
    // Une fois connecté, NestJS remplit 'req.user' automatiquement
    const user = req.user; 
    
    return await this.analyseService.analyzeLink(
      dto.url, 
      user, // Ici, user contient ton vrai UUID (ex: user.id_utilisateur)
      dto.canal_source || 'Web Dashboard'
    );
  }
}