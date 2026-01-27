import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ModuleEducatif } from '../modules_educatifs/modules_educatifs.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id_quiz: string;

  @ManyToOne(() => ModuleEducatif, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_module' })
  module: ModuleEducatif;

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
