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
import { ReponsePossible } from '../reponses_possibles/reponses_possibles.entity';


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


  @ManyToOne(() => ReponsePossible, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'id_reponse_choisie' })
  reponse_choisie?: ReponsePossible | null; // Le "?" et le "| null" disent à TS que c'est optionnel

  @Column({ type: 'boolean' })
  est_correcte: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_reponse: Date;
}