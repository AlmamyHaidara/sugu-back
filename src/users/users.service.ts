import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, hash } from 'src/utils/bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Express } from 'express';
import { genererCode } from 'src/utils/functions';
import { MailService } from 'src/mail/mail.service';
import { templateToSendCodePassword } from 'src/mail/data';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

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
      })) as any;
      console.log('eee', isExiste);

      if (isExiste) {
        throw new ConflictException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Utilisateur existe déjà.',
            error: 'Conflict',
          },
          // HttpStatus.,
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
        id: user.id,
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

  async createDb(
    createUserDto: CreateUserDto,
    db: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ) {
    this.logger.log('Creating a new user');
    try {
      const isExiste = (await this.findOne({
        email: createUserDto.email,
      })) as any;
      console.log('eee', isExiste);

      if (isExiste) {
        throw new ConflictException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Utilisateur existe déjà.',
            error: 'Conflict',
          },
          // HttpStatus.,
        );
      }

      const passwordHash = await hash(createUserDto.password);
      // const user = await .$transaction(async (prisma) => {
      const user = await this.prisma.utilisateur.create({
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
      // });

      return user.id;
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
  async findOne(user: {
    email?: string;
    telephone?: null;
  }): Promise<User | null> {
    this.logger.log(`Finding user with criteria: ${JSON.stringify(user)}`);
    try {
      console.log(user.email);

      if (user.email) {
        const userExist = await this.prisma.utilisateur.findUnique({
          where: {
            email: user.email,
          },
        });
        console.log('ppppppppppppppppppppppppppppp');

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
  async update(
    id: number,
    updateProduitDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    this.logger.log('Creating a new user');
    try {
      const isExiste: User = (await this.findOne({
        email: updateProduitDto.email,
      })) as User;

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: "Utilisateur n'existe pas.",
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      if (file) {
        updateProduitDto.avatar = file.path.split('uploads/')[1];
      }

      // delete updateProduitDto?.password;
      const user = await this.prisma.$transaction(async (prisma) => {
        return await prisma.utilisateur.update({
          where: {
            id: isExiste?.id,
          },
          data: {
            ...updateProduitDto,
          },
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            profile: true,
            avatar: true,
          },
        });
      });
      return {
        status: 200,
        data: { ...user },
        msg: `L'utilisateur ${user.nom} ${user.prenom} a a ete mis àjours avec success`,
      };
    } catch (error) {
      console.error(error.status);
      switch (error.status) {
        case 404:
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Utilisateur introuvable.',
              error: 'Not found',
            },
            HttpStatus.NOT_FOUND,
          );
          break;
        case 500:
          throw Error(
            "Une Erreur c'est produit lord de la mise a jours de utilisateur",
          );
          break;
        default:
          break;
      }
    }
  }

  async passwordUpdate(
    userId: number,
    newPassword: string,
    currentPassword: string,
  ) {
    this.logger.log('Mise a jours du mots de passe');
    try {
      const isExiste = await this.prisma.utilisateur.findFirst({
        where: {
          id: userId,
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: "Utilisateur n'existe pas.",
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      const isValidated = await compare(currentPassword, isExiste.password);

      if (!isValidated) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Le mots de passe courant est invalide',
            error: 'Conflict',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      // delete updateProduitDto?.password;
      const user = await this.prisma.$transaction(async (prisma) => {
        return await prisma.utilisateur.update({
          where: {
            id: isExiste?.id,
          },
          data: {
            password: await hash(newPassword),
          },
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            profile: true,
            avatar: true,
          },
        });
      });
      return {
        status: 200,
        data: { ...user },
        msg: `Le mots de passe de  ${user.nom} ${user.prenom} a a ete mis àjours avec success`,
      };
    } catch (error) {
      console.error(error.status);
      switch (error.status) {
        case 404:
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Utilisateur introuvable.',
              error: 'Not found',
            },
            HttpStatus.NOT_FOUND,
          );
          break;
        case 500:
          throw Error(
            "Une Erreur c'est produit lord de la mise a jours de utilisateur",
          );
          break;

        case 400:
          throw new BadRequestException(
            'Le mots de passe courant est invalide',
          );
          break;
        default:
          break;
      }
    }
  }

  /**
   * Removes a user entry from the database.
   *
   * @param {number} id - The ID of the user to remove.
   * @returns {Promise<boolean>} - A message indicating the action.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.utilisateur.findUniqueOrThrow({
        where: { id: id },
      });

      const result = await this.prisma.utilisateur.deleteMany({
        where: { id: id },
      });
      return !!result;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async passwordForget(email: string) {
    this.logger.log(
      `La renitialisation du mots de passe requiere l'email: ${email}`,
    );
    const code = genererCode();

    try {
      const user = await this.prisma.utilisateur.findUnique({
        where: { email: email },
      });

      if (!user) {
        this.logger.warn(
          `Pas d'utilisateur trouvez avec cet addresse email: ${email}`,
        );

        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
          message: `Si un compte avec cet adresse e-mail ${email} existes, un lien de renitialisation de mots de passe serat envoie.`,
        };
      }

      this.logger.log(
        `Utilisateur non trouvez avec cet adresse email: ${email}, prossedons a l'envoie du mail de renitialisation.`,
      );
      // Generate a password reset token and its expiration time
      await this.mailService.sendMail(
        [email],
        'Le code pour renitialiser votre mots de passe',
        templateToSendCodePassword(code, user.prenom + ' ' + user.nom),
      );

      // Ici, vous pouvez implémenter la logique pour envoyer un email de réinitialisation de mot de passe
      return {
        status: HttpStatus.OK,
        data: code,
        message: `Utilisateur trouvez avec cet adresse email: ${email}, prossedons a l'envoie du mail de renitialisation.`,
      };
    } catch (error) {
      this.logger.error(`Error finding user with email: ${email}`, error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: `Si un compte avec cet adresse e-mail ${email} existes, un lien de renitialisation de mots de passe serat envoie.`,
      };
    }
  }

  async changePassword(request: { email: string; password: string }) {
    this.logger.log('Mise a jours du mots de passe');
    try {
      const isExiste = await this.prisma.utilisateur.findFirst({
        where: {
          email: request.email,
        },
      });

      if (!isExiste) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: "Utilisateur n'existe pas.",
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      // delete updateProduitDto?.password;
      const user = await this.prisma.$transaction(async (prisma) => {
        return await prisma.utilisateur.update({
          where: {
            id: isExiste?.id,
          },
          data: {
            password: await hash(request.password),
          },
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            profile: true,
            avatar: true,
          },
        });
      });
      return {
        status: 200,
        data: { ...user },
        msg: `Le mots de passe de  ${user.nom} ${user.prenom} a a ete mis àjours avec success`,
      };
    } catch (error) {
      console.error(error.status);
      switch (error.status) {
        case 404:
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Utilisateur introuvable.',
              error: 'Not found',
            },
            HttpStatus.NOT_FOUND,
          );
          break;
        case 500:
          throw Error(
            "Une Erreur c'est produit lord de la mise a jours de utilisateur",
          );
          break;

        case 400:
          throw new BadRequestException(
            'Le mots de passe courant est invalide',
          );
          break;
        default:
          break;
      }
    }
  }
}
