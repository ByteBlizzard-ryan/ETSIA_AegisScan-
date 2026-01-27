import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum Gravite {
  FAIBLE = 'faible',
  MOYENNE = 'moyenne',
  ELEVEE = 'élevée',
  CRITIQUE = 'critique',
}

@Entity()
export class TypeMenace {
  @PrimaryGeneratedColumn('uuid')
  id_menace: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nom_menace: string;

  @Column({ type: 'enum', enum: Gravite })
  gravite: Gravite;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation: Date;

  @Column({ type: 'text', nullable: true })
  recommandation: string | null;
}
