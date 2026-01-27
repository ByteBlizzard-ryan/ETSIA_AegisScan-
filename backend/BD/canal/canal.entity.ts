import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Canal {
  @PrimaryGeneratedColumn('uuid')
  id_canal: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  nom: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  actif_par_defaut: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icone: string;
}
