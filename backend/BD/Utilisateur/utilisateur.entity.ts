import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TypeCompte {
  UTILISATEUR = 'utilisateur',
  ADMINISTRATEUR = 'administrateur',
}

@Entity('utilisateurs') // nom de la table en français
export class Utilisateur {
  @PrimaryGeneratedColumn('uuid')
  id_utilisateur: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nom_utilisateur: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  mot_de_passe_hash: string;

  @Column({ type: 'enum', enum: TypeCompte, default: TypeCompte.UTILISATEUR })
  type_compte: TypeCompte;

  @CreateDateColumn({ type: 'timestamp' })
  date_inscription: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_derniere_connexion: Date;

  @Column({ type: 'boolean', default: true })
  est_actif: boolean;

  @Column({ type: 'boolean', default: false })
  consentement_analyse: boolean;
}
