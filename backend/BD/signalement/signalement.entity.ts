import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { AnalysesLien } from 'BD/analyses_lien/analyses_lien.entity';

/* ENUMS STRICTEMENT IDENTIQUES */

export enum TypeSignalement {
  MENACE_DETECTEE = 'menace_detectee',
  SIGNALEMENT = 'signalement',
  STATUT_MODIFIE = 'statut_modifie',
  RAPPORT_HEBDOMADAIRE = 'rapport_hebdomadaire',
  SECURITE_URGENCE = 'securite_urgence',
  INFO = 'info',
  PROMOTION = 'promotion',
  SYSTEME = 'systeme',
}

export enum NiveauUrgence {
  FAIBLE = 'faible',
  MOYEN = 'moyen',
  ELEVE = 'eleve',
  CRITIQUE = 'critique',
}

@Entity('signalements')
export class Signalement {
  @PrimaryGeneratedColumn('uuid')
  id_signalement: string;

  /* FK → UTILISATEURS (auteur du signalement) */
  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  /* FK → ANALYSES_LIEN */
  @ManyToOne(() => AnalysesLien)
  @JoinColumn({ name: 'id_analyse' })
  analyse: AnalysesLien;

  @Column({
    type: 'enum',
    enum: TypeSignalement,
  })
  type_signalement: TypeSignalement;

  @Column({ type: 'text', nullable: true })
  commentaire: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  date_signalement: Date;

  @Column({ type: 'varchar', length: 20, default: 'En attente' })
  statut: string;

  /* FK → UTILISATEURS (agent qui traite) */
  @ManyToOne(() => Utilisateur, { nullable: true })
  @JoinColumn({ name: 'traite_par' })
  traite_par: Utilisateur | null;

  @Column({ type: 'timestamp', nullable: true })
  date_traitement: Date | null;

  @Column({ type: 'text', nullable: true })
  motif_traitement: string | null;

  @Column({
    type: 'enum',
    enum: NiveauUrgence,
    default: NiveauUrgence.FAIBLE,
  })
  niveau_urgence: NiveauUrgence;
}
