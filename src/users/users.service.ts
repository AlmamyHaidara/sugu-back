import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Utilisateur } from '@prisma/client';
import { hash } from 'src/utils/bcrypt';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user entry in the database.
   *
   * @param {CreateUserDto} createUserDto - The data transfer object containing the details of the user to be created.
   * @returns {Promise<{status: number, msg: string}>} - The status and message of the created user.
   * @throws {HttpException} - Throws an HTTP exception if the user already exists or if there is an internal server error.
   */
  async create(createUserDto: CreateUserDto) {
    this.logger.log('Creating a new user');
    try {
      const isExiste = (await this.findOne({
        email: createUserDto.email,
      })) as Utilisateur;

      if (isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Utilisateur existe déjà.',
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      const passwordHash = await hash(createUserDto.password);
      const user = await this.prisma.$transaction(async (prisma) => {
        return await prisma.utilisateur.create({
          data: {
            nom: createUserDto.nom,
            prenom: createUserDto.prenom,
            email: createUserDto.email,
            telephone: createUserDto.telephone,
            password: passwordHash,
            profile: createUserDto.profile || 'CLIENT',
          },
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            profile: true,
          },
        });
      });

      return {
        status: 201,
        msg: `L'utilisateur ${user.nom} ${user.prenom} a a ete creer avec success`,
      };
    } catch (error) {
      console.error(error.status);
      switch (error.status) {
        case 409:
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'Utilisateur existe déjà.',
              error: 'Conflict',
            },
            HttpStatus.CONFLICT,
          );
          break;
        case 500:
          throw Error(
            "Une Erreur c'est produit lord de la creation d'un utilisateur",
          );
          break;
        default:
          break;
      }
    }
  }

  /**
   * Fetches all users from the database.
   *
   * @returns {string} - A message indicating the action.
   */
  findAll() {
    return `This action returns all produit`;
  }

  /**
   * Fetches a specific user by email or telephone.
   *
   * @param {Object} user - The object containing the email or telephone of the user to fetch.
   * @returns {Promise<User | undefined>} - The fetched user or undefined if not found.
   */
  async findOne(user: { email?: string; telephone?: null }): Promise<User> {
    this.logger.log(`Finding user with criteria: ${JSON.stringify(user)}`);
    try {
      console.log(user);

      if (user.email) {
        const userExist = this.prisma.utilisateur.findUnique({
          where: {
            email: user.email,
          },
        });

        return userExist;
      } else if (user.telephone) {
        const userExist = this.prisma.utilisateur.findUnique({
          where: {
            telephone: user.telephone,
          },
        });

        return userExist;
      }
    } catch (error) {
      console.error('...findOne', error);
      return null;
    }
    // return this.users.find(user => user.username === username);
  }

  /**
   * Fetches a specific user by their ID.
   *
   * @param {number} id - The ID of the user to fetch.
   * @returns {Promise<{ id: number } | null>} - The fetched user or null if not found.
   */
  async findOneById(id: number): Promise<{ id: number } | null> {
    try {
      if (id != 0) {
        const userExist = this.prisma.utilisateur.findUnique({
          where: {
            id: id,
          },
          select: {
            id: true,
          },
        });

        return userExist;
      }
    } catch (error) {
      console.error('...findOne', error);
      return null;
    }
    // return this.users.find(user => user.username === username);
  }

  /**
   * Fetches the current user by their email.
   *
   * @param {string} email - The email of the user to fetch.
   * @returns {Promise<User>} - The fetched user.
   */
  async getCurrentUser(email: string): Promise<User> {
    this.logger.log(`Getting current user with email: ${email}`);
    try {
      console.log(email);

      const userExist = await this.prisma.utilisateur.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          telephone: true,
          profile: true,
        },
      });

      return userExist;
    } catch (error) {
      console.error('...getCurrentUser', error);
      return null;
    }
    // return this.users.find(user => user.username === username);
  }

  /**
   * Updates an existing user entry in the database.
   *
   * @param {number} id - The ID of the user to update.
   * @param {UpdateUserDto} updateProduitDto - The data transfer object containing the updated details of the user.
   * @returns {string} - A message indicating the action.
   */
  update(id: number, updateProduitDto: UpdateUserDto) {
    return `This action updates a #${id} produit`;
  }

  /**
   * Removes a user entry from the database.
   *
   * @param {number} id - The ID of the user to remove.
   * @returns {string} - A message indicating the action.
   */
  remove(id: number) {
    return `This action removes a #${id} produit`;
  }
}
