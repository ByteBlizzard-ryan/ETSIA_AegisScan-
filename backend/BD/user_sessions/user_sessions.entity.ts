import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';

@Entity('user_sessions')
export class UserSessions {
  @PrimaryGeneratedColumn('uuid')
  id_session: string;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @Column({ type: 'varchar', length: 255 })
  session_token_hash: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip_address: string | null;

  @Column({ type: 'text', nullable: true })
  user_agent: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  last_activity: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
