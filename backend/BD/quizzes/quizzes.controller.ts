import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes') 
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  /**
   * Récupère la liste de tous les quiz
   */
  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  /**
   * Récupère les détails d'un quiz spécifique (questions et réponses)
   */
  @Get(':id/details')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOneWithDetails(id);
  }

  /**
   * Soumet les réponses d'un quiz
   * Attends un body JSON : { id_utilisateur: string, id_quiz: string, reponses: any[] }
   */
  @Post('submit')
  async submit(
    @Body() body: { id_utilisateur: string; id_quiz: string; reponses: any[] }
  ) {
    // On passe les 3 arguments requis par QuizzesService.submitQuiz()
    return this.quizzesService.submitQuiz(
      body.id_utilisateur, 
      body.id_quiz, 
      body.reponses
    );
  }
}