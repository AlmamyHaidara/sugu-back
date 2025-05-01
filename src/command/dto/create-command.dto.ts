import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';

export enum EtatCommand {
  ANNULER = 'ANNULER',
  VALIDER = 'VALIDER',
  ATTENTE = 'ATTENTE',
  LIVRER = 'LIVRER',
}

export class CreateCommandDto {
  @IsNotEmpty()
  @IsNumber()
  usetilisateurId: number;

  @IsNotEmpty()
  @IsNumber()
  adresseId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  commandeNbr: string;

  @IsNotEmpty()
  @IsArray()
  ligneCommands: {
    quantiter: number;
    prixId: number;
  }[];

  @IsNotEmpty()
  @IsEnum(EtatCommand)
  etat: EtatCommand;
}
