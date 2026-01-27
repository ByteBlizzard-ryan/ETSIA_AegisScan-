import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('plan_abonnement') // nom exact de la table en DB
export class PlanAbonnement {
  @PrimaryGeneratedColumn('uuid')
  id_plan_abonnement: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nom: string;

  @Column({ type: 'int', default: 0 })
  prix_mensuel: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 10 })
  limite_analyses_jour: number;

  @Column({ type: 'int', default: 30 })
  limite_historique_jours: number;

  @Column({ type: 'int', default: 10 })
  limite_quiz_jours: number;

  @Column({ type: 'boolean', default: false })
  acces_historique: boolean;

  @Column({ type: 'boolean', default: false })
  acces_statistiques: boolean;

  @Column({ type: 'boolean', default: false })
  acces_quiz_illimites: boolean;
}
