import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import * as bcrypt from 'bcrypt';
import { CreateUtilisateurDto } from './create-utilisateur.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly repo: Repository<Utilisateur>,
  ) {}

  async register(data: CreateUtilisateurDto) {
    // 1. Vérifier si l'email OU le nom d'utilisateur existe déjà
    const userExists = await this.repo.findOne({
      where: [
        { email: data.email },
        { nom_utilisateur: data.username }
      ]
    });

    if (userExists) {
      if (userExists.email === data.email) {
        throw new ConflictException('Oups, cet email est déjà utilisé !');
      }
      if (userExists.nom_utilisateur === data.username) {
        throw new ConflictException("Ce nom d'utilisateur est déjà pris !");
      }
    }

    // 2. Hacher le mot de passe
    // La méthode hash avec un nombre (10) génère le sel automatiquement en interne
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // 3. Créer l'entité
    const nouvelUtilisateur = this.repo.create({
      nom_utilisateur: data.username,
      email: data.email,
      mot_de_passe_hash: hashedPassword,
      consentement_analyse: data.acceptTerms, 
    });

    // 4. Sauvegarder
    return await this.repo.save(nouvelUtilisateur);
  }
}