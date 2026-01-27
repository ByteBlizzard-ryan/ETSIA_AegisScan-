import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { PlanAbonnement } from '../plan_abonnement/plan_abonnement.entity';

@Entity()
export class Abonnement {
  @PrimaryGeneratedColumn('uuid')
  id_abonnement: string;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @ManyToOne(() => PlanAbonnement)
  @JoinColumn({ name: 'id_plan_abonnement' })
  plan: PlanAbonnement;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_debut: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_fin: Date | null;

  @Column({ type: 'enum', enum: ['actif', 'expire', 'suspendu'], default: 'actif' })
  statut: 'actif' | 'expire' | 'suspendu';
}
