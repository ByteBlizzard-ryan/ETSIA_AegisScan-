import { IsNotEmpty, MinLength, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string; // Pour vérifier que c'est bien l'utilisateur

  @MinLength(8, { message: "Le nouveau mot de passe doit faire au moins 8 caractères" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: "Le nouveau mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial",
  })
  newPassword: string;
} 