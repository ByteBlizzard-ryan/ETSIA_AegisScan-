import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { Lien } from 'BD/liens/liens.entity';
import { AnalysesLien } from 'BD/analyses_lien/analyses_lien.entity';

@Entity('assistant_ia')
export class AssistantIA {
  @PrimaryGeneratedColumn('uuid')
  id_interaction: string;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  reponse: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contexte: string | null;

  @ManyToOne(() => Lien, { nullable: true })
  @JoinColumn({ name: 'id_lien' })
  lien: Lien | null;

  @ManyToOne(() => AnalysesLien, { nullable: true })
  @JoinColumn({ name: 'id_analyse' })
  analyse: AnalysesLien | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  date_interaction: Date;

  @Column({ type: 'int', nullable: true })
  satisfaction: number | null;
}
