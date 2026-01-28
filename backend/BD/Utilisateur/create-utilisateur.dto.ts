import { IsEmail, IsNotEmpty, MinLength, Matches, IsBoolean } from 'class-validator';

export class CreateUtilisateurDto {
  @IsNotEmpty({ message: "Le nom d'utilisateur ne peut pas être vide" })
  username: string;

  @IsEmail({}, { message: "L'adresse email n'est pas valide" })
  email: string;

  @MinLength(8, { message: "Le mot de passe doit faire au moins 8 caractères" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial",
  })
  password: string;

  @IsBoolean({ message: "Le consentement est obligatoire" })
  acceptTerms: boolean;
}