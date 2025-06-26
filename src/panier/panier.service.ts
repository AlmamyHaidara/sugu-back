import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  async addToCart(data: {
    utilisateurId: number;
    produitId?: number;
    boutiqueId?: number;
    particulierId?: number;
    count: number;
  }) {
    try {
      const user = await this.prisma.utilisateur.findFirst({
        where: {
          id: data.utilisateurId,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Ressource non trover.',
            error: 'Non trouve',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (data.boutiqueId != null) {
        const boutique = await this.prisma.boutique.findFirst({
          where: {
            id: data.boutiqueId,
          },
          select: {
            id: true,
          },
        });
        if (!boutique) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Ressource non trover.',
              error: 'Non trouve',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const produit = await this.prisma.produit.findFirst({
          where: {
            id: data.produitId,
          },
          select: {
            id: true,
          },
        });

        if (!produit) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Ressource non trover.',
              error: 'Non trouve',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const isExiste = await this.prisma.panier.findFirst({
          where: {
            boutiqueId: boutique.id,
            produitId: produit.id,
            utilisateurId: user.id,
          },
          select: {
            id: true,
            count: true,
          },
        });
        console.log(isExiste);

        if (isExiste) {
          const updateBasket = await this.prisma.panier.update({
            where: {
              id: isExiste.id,
            },
            data: {
              count: data.count + isExiste.count,
            },
          });

          return updateBasket;
        } else {
          const newPanier = await this.prisma.panier.create({
            data: {
              count: data.count,
              boutiques: {
                connect: {
                  id: data.boutiqueId,
                },
              },
              produits: {
                connect: {
                  id: data.produitId,
                },
              },
              utilisateurs: {
                connect: {
                  id: data.utilisateurId,
                },
              },
            },
          });
          if (!newPanier) {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
          return newPanier;
        }
      } else {
        const particulier = await this.prisma.particular.findFirst({
          where: {
            id: data.particulierId,
          },
          select: {
            id: true,
          },
        });
        if (!particulier) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Ressource non trover.',
              error: 'Non trouve',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const produit = await this.prisma.produit.findFirst({
          where: {
            id: data.produitId,
          },
          select: {
            id: true,
          },
        });

        if (!produit) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Ressource non trover.',
              error: 'Non trouve',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const isExiste = await this.prisma.panier.findFirst({
          where: {
            particulierId: particulier.id,
            produitId: produit.id,
            utilisateurId: user.id,
          },
          select: {
            id: true,
            count: true,
          },
        });
        console.log(isExiste);

        if (isExiste) {
          const updateBasket = await this.prisma.panier.update({
            where: {
              id: isExiste.id,
            },
            data: {
              count: data.count + isExiste.count,
            },
          });

          return updateBasket;
        } else {
          const newPanier = await this.prisma.panier.create({
            data: {
              count: data.count,
              particuliers: {
                connect: {
                  id: data?.particulierId,
                },
              },
              produits: {
                connect: {
                  id: data.produitId,
                },
              },
              utilisateurs: {
                connect: {
                  id: data.utilisateurId,
                },
              },
            },
          });
          if (!newPanier) {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
          return newPanier;
        }
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return null;
    }
  }

  async getCart(boutiqueId: number) {
    return this.prisma.panier.findMany({
      where: { boutiqueId },
      include: {
        produits: true,
        boutiques: true,
        particuliers: true,
      },
    });
  }

  // async getCartByUser(utilisateurId: number) {
  //   return this.prisma.panier.findMany({
  //     where: { utilisateurId },
  //     include: {
  //       produits: {
  //         include: {
  //           Prix: {
  //             select: {
  //               prix: true,
  //             },
  //           },
  //         },
  //       },
  //       boutiques: true,
  //     },
  //   });
  // }

  async getCartByUser(utilisateurId: number) {
    // Récupère les produits dans le panier de l'utilisateur
    const cartItems = await this.prisma.panier.findMany({
      where: { utilisateurId },

      select: {
        boutiqueId: true,
        count: true,
        id: true,
        boutiques: {
          select: {
            id: true,
            nom: true,
            categorie: true,
            description: true,
            img: true,
          },
        },
        particuliers: {
          select: {
            id: true,
            userId: true,
            utilisateur: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
              },
            },
          },
        },
        produits: {
          select: {
            id: true,
            nom: true,
            categories: true,
            description: true,
            img: true,
            Prix: {
              select: {
                prix: true,
                id: true,
              },
            },
          },
        },
      },
    });

    const reformattedCartItems = cartItems.map((item) => {
      const { Prix, ...otherProduits } = item.produits || {}; // Supprime la clé Prix
      return {
        ...item,
        produits: {
          ...otherProduits,
          prixId: Prix?.[0]?.id,
          prix: Prix?.[0]?.prix,
        },
      };
    });

    const cumulatedItems = reformattedCartItems.reduce(
      (acc, item) => {
        const existingItem = acc.find(
          (prod) => prod.produits.id === item.produits.id,
        );
        if (existingItem) {
          existingItem.count += item.count;
        } else {
          acc.push({ ...item });
        }
        return acc;
      },
      [] as Array<(typeof reformattedCartItems)[0]>,
    );

    // Retourner les produits cumulés
    return cumulatedItems;
  }

  async updateCartItem(id: number, count: number) {
    const isExiste = await this.prisma.panier.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });

    if (!isExiste) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal error',
          error: 'Internal error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.panier.update({
      where: { id },
      data: { count },
    });
  }

  async removeFromCart(id: number) {
    try {
      const isDeleted = await this.prisma.panier.delete({
        where: { id },
      });
      console.log(isDeleted);
      return true;
    } catch (error) {
      console.log(error?.code);
      return null;
    }
  }

  async emptyCart(id: number) {
    return this.prisma.panier.deleteMany({
      where: {
        OR: [{ boutiqueId: id }, { particulierId: id }],
      },
    });
  }
}
