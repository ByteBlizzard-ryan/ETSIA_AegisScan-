import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importations de tes modules de base de données (BD)
import { UtilisateurModule } from 'BD/Utilisateur/utilisateur.module';
import { PlanAbonnementModule } from 'BD/plan_abonnement/plan_abonnement.module';
import { AbonnementModule } from 'BD/abonnement/abonnement.module';
import { CanalModule } from 'BD/canal/canal.module';
import { CanauxUtilisateurModule } from 'BD/canaux_utilisateur/canaux_utilisateur.module';
import { LiensModule } from 'BD/liens/liens.module';
import { TypeMenaceModule } from 'BD/type_menaces/type_menace.module';
import { AnalysesLienModule } from 'BD/analyses_lien/analyses_lien.module';
import { AnalysesMenacesModule } from 'BD/analyses_menaces/analyses_menaces.module';
import { NotificationModule } from 'BD/notification/notification.module';
import { SignalementModule } from 'BD/signalement/signalement.module';
import { ModulesEducatifsModule } from 'BD/modules_educatifs/modules_educatifs.module';
import { QuizzesModule } from 'BD/quizzes/quizzes.module';
import { QuestionsModule } from 'BD/questions/questions.module';
import { ReponsesPossiblesModule } from 'BD/reponses_possibles/reponses_possibles.module';
import { ReponsesUtilisateurModule } from 'BD/reponses_utilisateur/reponses_utilisateur.module';
import { ProgressionModule } from 'BD/progression/progression.module';
import { BadgesModule } from 'BD/badges/badges.module';
import { BadgesUtilisateurModule } from 'BD/badges_utilisateu/badges_utilisateur.module';
import { AssistanceModule } from 'BD/assistance/assistance.module';
import { AssistantIAModule } from 'BD/assistant_ia/assistant_ia.module';
import { UserSessionsModule } from 'BD/user_sessions/user_sessions.module';
import { AnalyticsEventsModule } from 'BD/analytics_events/analytics_events.module';

@Module({
  imports: [
    // Configuration pour lire le fichier .env
    ConfigModule.forRoot({
      isGlobal: true, // Rend les variables accessibles dans tous les modules
    }),

    // Configuration de TypeORM utilisant les variables d'environnement
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME', 'AegisScan'),
        autoLoadEntities: true, // Charge automatiquement les entités décorées @Entity()
        synchronize: true,     // Crée les tables automatiquement (uniquement en DEV)
      }),
    }),

    // Liste de tes modules fonctionnels
    UtilisateurModule,
    PlanAbonnementModule,
    AbonnementModule,
    CanalModule,
    CanauxUtilisateurModule,
    LiensModule,
    TypeMenaceModule,
    AnalysesLienModule,
    AnalysesMenacesModule,
    NotificationModule,
    SignalementModule,
    ModulesEducatifsModule,
    QuizzesModule,
    QuestionsModule,
    ReponsesPossiblesModule,
    ReponsesUtilisateurModule,
    ProgressionModule,
    BadgesModule,
    BadgesUtilisateurModule,
    AssistanceModule,
    AssistantIAModule,
    UserSessionsModule,
    AnalyticsEventsModule,
  ],
})
export class AppModule {}
