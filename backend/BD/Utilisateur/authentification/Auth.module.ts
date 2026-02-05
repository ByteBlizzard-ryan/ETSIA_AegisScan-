import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {AuthService} from "./authService.service";
import {AuthController} from "./Auth.controller";
import {Utilisateur} from "../utilisateur.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    // On utilise registerAsync pour pouvoir injecter le ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'ma_cle_secrete_super_secure',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([Utilisateur])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}