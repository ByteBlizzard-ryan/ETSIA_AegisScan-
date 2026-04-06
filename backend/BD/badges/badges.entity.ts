import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToOne, 
  JoinColumn 
} from 'typeorm';
import { ModuleEducatif } from '../modules_educatifs/modules_educatifs.entity';

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id_badge: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nom_badge: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icone: string | null;

  // --- RELATION ---
  // On pointe vers 'badge' qui est le nom de la propriété dans ModuleEducatif
  @OneToOne(() => ModuleEducatif, (moduleEducatif) => moduleEducatif.badge, { 
    nullable: true, 
    onDelete: 'SET NULL' 
  })
  @JoinColumn({ name: 'id_module' }) // La colonne SQL créée sera id_module
  module: ModuleEducatif;
}