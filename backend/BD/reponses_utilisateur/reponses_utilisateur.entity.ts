import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { Question } from 'BD/questions/questions.entity';

@Entity('reponses_utilisateur')
export class ReponseUtilisateur {
  @PrimaryGeneratedColumn('uuid')
  id_reponse_user: string;

  @ManyToOne(() => Utilisateur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_question' })
  question: Question;

  @Column({ type: 'varchar', length: 500 })
  reponse_choisie: string;

  @Column({ type: 'boolean' })
  est_correcte: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  date_reponse: Date;
}
