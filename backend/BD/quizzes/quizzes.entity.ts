// BD/quizzes/quizzes.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ModuleEducatif } from '../modules_educatifs/modules_educatifs.entity';
import { Question } from '../questions/questions.entity'; // Import à ajouter

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id_quiz: string;

  @ManyToOne(() => ModuleEducatif, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_module' })
  module: ModuleEducatif;

  // AJOUTER CETTE RELATION :
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @Column({ type: 'varchar', length: 200 })
  titre: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'int' })
  nb_questions: number;

  @Column({ type: 'int' })
  duree: number;

  @Column({ type: 'int' })
  points_max: number;

  @Column({ type: 'boolean', default: false })
  acces_premium_only: boolean;
}