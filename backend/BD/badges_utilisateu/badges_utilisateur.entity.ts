import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import { Badge } from 'BD/badges/badges.entity';

@Entity('badges_utilisateur')
export class BadgesUtilisateur {

  // 🔑 Clé primaire composite
  @PrimaryColumn('uuid')
  id_utilisateur: string;

  @PrimaryColumn('uuid')
  id_badge: string;

  // 🔗 Utilisateur
  @ManyToOne(() => Utilisateur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  // 🔗 Badge
  @ManyToOne(() => Badge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_badge' })
  badge: Badge;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  date_obtention: Date;
}
