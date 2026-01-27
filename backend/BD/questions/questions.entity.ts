import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Quiz } from '../quizzes/quizzes.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id_question: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_quiz' })
  quiz: Quiz;

  @Column({ type: 'text' })
  texte: string;

  @Column({ type: 'varchar', length: 20 })
  type_question: string;

  @Column({ type: 'varchar', length: 500 })
  bonne_reponse: string;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'int' })
  ordre: number;

  @Column({ type: 'text', nullable: true })
  explication: string | null;
}
