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

/* ENUMS EXACTS DU SCHÉMA */

export enum NiveauUrgence {
  FAIBLE = 'faible',
  MOYEN = 'moyen',
  ELEVE = 'eleve',
  CRITIQUE = 'critique',
}

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

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id_notification: string;

  /* FK → UTILISATEURS */
  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  /* FK → ANALYSES_LIEN */
  @ManyToOne(() => AnalysesLien)
  @JoinColumn({ name: 'id_analyse' })
  analyse: AnalysesLien;

  @Column({ type: 'varchar', length: 50 })
  type_alerte: string;

  @Column({ type: 'varchar', length: 20 })
  niveau_alerte: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'date_création_alerte',
    default: () => 'NOW()',
  })
  date_creation_alerte: Date;

  @Column({ type: 'boolean', default: false })
  est_lue: boolean;

  @Column({ type: 'timestamp', nullable: true })
  date_lecture: Date | null;

  @Column({
    type: 'enum',
    enum: NiveauUrgence,
    default: NiveauUrgence.FAIBLE,
  })
  niveau_urgence: NiveauUrgence;

  @Column({
    type: 'enum',
    enum: TypeSignalement,
  })
  type_signalement: TypeSignalement;
}
