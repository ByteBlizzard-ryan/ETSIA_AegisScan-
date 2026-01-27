import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { AnalysesLien } from 'BD/analyses_lien/analyses_lien.entity';
import { TypeMenace } from 'BD/type_menaces/type_menace.entity';

@Entity('analyses_menaces')
export class AnalysesMenaces {

  // 🔑 Clé primaire composite
  @PrimaryColumn('uuid')
  id_analyse: string;

  @PrimaryColumn('uuid')
  id_menace: string;

  // 🔗 FK vers analyses_lien
  @ManyToOne(() => AnalysesLien, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_analyse' })
  analyse: AnalysesLien;

  // 🔗 FK vers type_menace
  @ManyToOne(() => TypeMenace, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_menace' })
  menace: TypeMenace;
}
