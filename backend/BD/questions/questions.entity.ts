// BD/questions/questions.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Quiz } from '../quizzes/quizzes.entity';
import { ReponsePossible } from '../reponses_possibles/reponses_possibles.entity'; // Import à ajouter

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id_question: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_quiz' })
  quiz: Quiz;

  // AJOUTER CETTE RELATION :
  @OneToMany(() => ReponsePossible, (reponse) => reponse.question)
  reponses_possibles: ReponsePossible[];

  @Column({ type: 'text' })
  texte: string;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'int' })
  ordre: number;

  @Column({ type: 'text', nullable: true })
  explication: string | null;

  @Column({ type: 'text', nullable: true })
  explication_reponse: string | null; 
}