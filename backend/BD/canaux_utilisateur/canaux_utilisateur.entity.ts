import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Canal } from '../canal/canal.entity';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';

@Entity()
export class CanauxUtilisateur {
  @PrimaryGeneratedColumn('uuid')
  id_canaux_utilisateur: string;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Canal)
  @JoinColumn({ name: 'id_canal' })
  canal: Canal;

  @Column({ type: 'boolean', default: false })
  actif: boolean;

  @Column({ type: 'timestamp', nullable: true })
  date_activation: Date | null;
}
