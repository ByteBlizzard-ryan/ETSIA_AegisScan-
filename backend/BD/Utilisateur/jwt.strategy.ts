import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // 1. On extrait le token du header 'Authorization: Bearer ...'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 2. On utilise la même clé secrète que celle du Login
      secretOrKey: configService.get<string>('JWT_SECRET') || 'ma_cle_secrete_super_secure',
    });
  }

  // 3. Cette fonction est appelée si le token est valide
  async validate(payload: any) {
    // Ce que tu retournes ici sera disponible dans 'req.user'
    return { id_utilisateur: payload.sub, email: payload.email };
  }
}