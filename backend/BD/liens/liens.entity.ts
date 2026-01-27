import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Canal } from '../canal/canal.entity';
import { Utilisateur } from 'BD/Utilisateur/utilisateur.entity';
import * as crypto from 'crypto';

@Entity()
export class Lien {
  @PrimaryGeneratedColumn('uuid')
  id_lien: string;

  @ManyToOne(() => Canal)
  @JoinColumn({ name: 'id_canal' })
  canal: Canal;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text' })
  url_complete: string;

  @Column({ type: 'char', length: 64, unique: true })
  url_hash: string;

  @Column({ type: 'varchar', length: 50 })
  source: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  logiciel_source: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_ajout: Date;

  @ManyToOne(() => Utilisateur)
  @JoinColumn({ name: 'id_utilisateur' })
  utilisateur: Utilisateur;

  @Column({ type: 'integer', default: 0 })
  total_analyses: number;

  // Générer automatiquement le hash de l'URL avant insertion
  @BeforeInsert()
  generateHash() {
    this.url_hash = crypto.createHash('sha256').update(this.url).digest('hex');
  }
}
