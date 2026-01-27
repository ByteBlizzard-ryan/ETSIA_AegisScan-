import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { TypeMenace } from '../type_menaces/type_menace.entity';
import { Lien } from 'BD/liens/liens.entity';

export enum NiveauRisque {
  SUR = 'sûr',
  SUSPECT = 'suspect',
  DANGEREUX = 'dangereux',
}

export enum StatutAnalyse {
  AUTORISE = 'autorisé',
  BLOQUE = 'bloqué',
}

@Entity()
export class AnalysesLien {
  @PrimaryGeneratedColumn('uuid')
  id_analyse: string;

  @ManyToOne(() => Lien)
  @JoinColumn({ name: 'id_lien' })
  lien: Lien;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => TypeMenace)
  @JoinColumn({ name: 'id_menace' })
  menace: TypeMenace;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  score_risque: number;

  @Column({ type: 'enum', enum: NiveauRisque })
  niveau_risque: NiveauRisque;

  @Column({ type: 'varchar', length: 20 })
  analyse_verdict_final: string;

  @Column({ type: 'varchar', length: 20 })
  type_analyse: string;

  @Column({ type: 'int' })
  temps_analyse_ms: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  date_analyse: Date;

  @Column({ type: 'text', nullable: true })
  motifs: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  canal_source: string | null;

  @Column({ type: 'enum', enum: StatutAnalyse })
  statut: StatutAnalyse;
}
