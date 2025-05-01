import { HttpException, HttpStatus } from "@nestjs/common";

export const ExeceptionCase = (error: any) => {
  switch (error.status) {
    case 409:
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Boutique existe déjà.',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
      break;
    case 404:
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Donnee introuvable.',
          error: 'Non Trouvez',
        },
        HttpStatus.NOT_FOUND,
      );
      break;

    case 500:
      throw Error("Une Erreur c'est produit lord de la creation du boutique");
      break;
    default:
      break;
  }
};
