import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from '../utilisateur.entity';
import { LoginDto } from './loginDTo.dot';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // <-- 1. Importe le JwtService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly repo: Repository<Utilisateur>,
    private readonly jwtService: JwtService, // <-- 2. Injecte-le ici
  ) {}

  async login(data: LoginDto) {
    const user = await this.repo.findOne({ where: { email: data.email } });

    if (!user || !(await bcrypt.compare(data.password, user.mot_de_passe_hash))) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // 3. Crée le Payload (les données contenues dans le token)
    // 'sub' est une convention pour l'ID de l'utilisateur
    const payload = { 
      sub: user.id_utilisateur, 
      email: user.email 
    };

    // 4. Génère le token et retourne-le
    return {
      message: 'Connexion réussie',
      access_token: this.jwtService.sign(payload), // <-- Génération du JWT
      user: {
        id: user.id_utilisateur,
        email: user.email,
        username: user.nom_utilisateur
      }
    };
  }
}