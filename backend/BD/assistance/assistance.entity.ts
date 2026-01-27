import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';

@Entity('assistance')
export class Assistance {
  @PrimaryGeneratedColumn('uuid')
  id_assistance: string;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @Column({ type: 'varchar', length: 200 })
  sujet: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 20, default: 'Moyenne' })
  priorite: string;

  @Column({ type: 'varchar', length: 20, default: 'Ouvert' })
  etat: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  date_creation: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_resolution: Date | null;

  @Column({ type: 'text', nullable: true })
  reponse: string | null;

  @Column({ type: 'uuid', nullable: true })
  agent_id: string | null;
}
