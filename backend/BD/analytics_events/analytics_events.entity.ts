import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';

@Entity('analytics_events')
export class AnalyticsEvents {
  @PrimaryGeneratedColumn('uuid')
  id_event: string;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @Column({ type: 'varchar', length: 100 })
  event_type: string;

  @Column({ type: 'jsonb', nullable: true })
  event_data: any;

  @Column({ type: 'varchar', length: 500, nullable: true })
  page_url: string | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip_address: string | null;

  @Column({ type: 'text', nullable: true })
  user_agent: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
}
