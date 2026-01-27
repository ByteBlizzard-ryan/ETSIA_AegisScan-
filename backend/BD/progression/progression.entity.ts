import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { ModuleEducatif } from 'BD/modules_educatifs/modules_educatifs.entity';
import { Quiz } from 'BD/quizzes/quizzes.entity';

@Entity('progression')
export class Progression {
  @PrimaryGeneratedColumn('uuid')
  id_progression: string;

  @ManyToOne(() => Utilisateur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => ModuleEducatif, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_module' })
  module: ModuleEducatif;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_quiz' })
  quiz: Quiz;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'int' })
  score_max: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  pourcentage: number;

  @CreateDateColumn({ type: 'timestamp' })
  date_completion: Date;
}
