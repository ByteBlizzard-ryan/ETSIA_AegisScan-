import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'text' })
  condition: string;

  @Column({ type: 'int', default: 0 })
  points_requis: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type_badge: string | null;
}
