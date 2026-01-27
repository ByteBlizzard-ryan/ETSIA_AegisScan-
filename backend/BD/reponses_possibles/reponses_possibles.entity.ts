import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../questions/questions.entity';

@Entity('reponses_possibles')
export class ReponsePossible {
  @PrimaryGeneratedColumn('uuid')
  id_reponse: string;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_question' })
  question: Question;

  @Column({ type: 'varchar', length: 500 })
  texte: string;

  @Column({ type: 'boolean', default: false })
  est_correcte: boolean;

  @Column({ type: 'int', nullable: true })
  ordre: number | null;
}
