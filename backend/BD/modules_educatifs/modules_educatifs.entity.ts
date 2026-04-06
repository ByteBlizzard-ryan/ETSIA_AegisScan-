import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Badge } from '../badges/badges.entity';

export enum NiveauModule {
  DEBUTANT = 'Débutant',
  INTERMEDIAIRE = 'Intermédiaire',
  AVANCE = 'Avancé',
}

@Entity('modules_educatifs')
export class ModuleEducatif {
  @PrimaryGeneratedColumn('uuid')
  id_module: string;

  @Column({ type: 'varchar', length: 200 })
  titre: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  contenu: string;

  @Column({
    type: 'enum',
    enum: NiveauModule,
    default: NiveauModule.DEBUTANT,
  })
  niveau: NiveauModule;

  @Column({ type: 'int', nullable: true })
  duree_estimee: number | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_creation: Date;

  @Column({ type: 'boolean', default: false })
  acces_premium_only: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url_image: string;

  // --- RELATION INVERSE ---
  // On pointe vers 'module' qui est le nom de la propriété dans Badge
  @OneToOne(() => Badge, (badge) => badge.module)
  badge: Badge;
}