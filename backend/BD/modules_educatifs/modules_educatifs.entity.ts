import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar', length: 20 })
  niveau: string;

  @Column({ type: 'int', nullable: true })
  duree_estimee: number | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  date_creation: Date;

  @Column({ type: 'boolean', default: false })
  acces_premium_only: boolean;

  @Column({ type: 'int', default: 0 })
  ordre_affichage: number;
}
