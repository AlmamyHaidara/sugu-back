"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("../utils/bcrypt");
let UsersService = UsersService_1 = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createUserDto) {
        this.logger.log('Creating a new user');
        try {
            const isExiste = (await this.findOne({
                email: createUserDto.email,
            }));
            console.log('eee', isExiste);
            if (isExiste) {
                throw new common_1.ConflictException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Utilisateur existe déjà.',
                    error: 'Conflict',
                });
            }
            const passwordHash = await (0, bcrypt_1.hash)(createUserDto.password);
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
        }
        catch (error) {
            console.error(error.status);
            switch (error.status) {
                case 409:
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.CONFLICT,
                        message: 'Utilisateur existe déjà.',
                        error: 'Conflict',
                    }, common_1.HttpStatus.CONFLICT);
                    break;
                case 500:
                    throw Error("Une Erreur c'est produit lord de la creation d'un utilisateur");
                    break;
                default:
                    break;
            }
        }
    }
    async createDb(createUserDto, db) {
        this.logger.log('Creating a new user');
        try {
            const isExiste = (await this.findOne({
                email: createUserDto.email,
            }));
            console.log('eee', isExiste);
            if (isExiste) {
                throw new common_1.ConflictException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Utilisateur existe déjà.',
                    error: 'Conflict',
                });
            }
            const passwordHash = await (0, bcrypt_1.hash)(createUserDto.password);
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
            return user.id;
        }
        catch (error) {
            console.error(error.status);
            switch (error.status) {
                case 409:
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.CONFLICT,
                        message: 'Utilisateur existe déjà.',
                        error: 'Conflict',
                    }, common_1.HttpStatus.CONFLICT);
                    break;
                case 500:
                    throw Error("Une Erreur c'est produit lord de la creation d'un utilisateur");
                    break;
                default:
                    break;
            }
        }
    }
    findAll() {
        return `This action returns all produit`;
    }
    async findOne(user) {
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
            }
            else if (user.telephone) {
                const userExist = this.prisma.utilisateur.findUnique({
                    where: {
                        telephone: user.telephone,
                    },
                });
                return userExist;
            }
        }
        catch (error) {
            console.error('...findOne', error);
            return null;
        }
    }
    async findOneById(id) {
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
        }
        catch (error) {
            console.error('...findOne', error);
            return null;
        }
    }
    async getCurrentUser(email) {
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
        }
        catch (error) {
            console.error('...getCurrentUser', error);
            return null;
        }
    }
    async update(id, updateProduitDto, file) {
        this.logger.log('Creating a new user');
        try {
            const isExiste = (await this.findOne({
                email: updateProduitDto.email,
            }));
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: "Utilisateur n'existe pas.",
                    error: 'Conflict',
                }, common_1.HttpStatus.CONFLICT);
            }
            if (file) {
                updateProduitDto.avatar = file.path.split('uploads/')[1];
            }
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
        }
        catch (error) {
            console.error(error.status);
            switch (error.status) {
                case 404:
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.NOT_FOUND,
                        message: 'Utilisateur introuvable.',
                        error: 'Not found',
                    }, common_1.HttpStatus.NOT_FOUND);
                    break;
                case 500:
                    throw Error("Une Erreur c'est produit lord de la mise a jours de utilisateur");
                    break;
                default:
                    break;
            }
        }
    }
    async passwordUpdate(userId, newPassword, currentPassword) {
        this.logger.log('Mise a jours du mots de passe');
        try {
            const isExiste = await this.prisma.utilisateur.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: "Utilisateur n'existe pas.",
                    error: 'Conflict',
                }, common_1.HttpStatus.CONFLICT);
            }
            const isValidated = await (0, bcrypt_1.compare)(currentPassword, isExiste.password);
            if (!isValidated) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Le mots de passe courant est invalide',
                    error: 'Conflict',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.prisma.$transaction(async (prisma) => {
                return await prisma.utilisateur.update({
                    where: {
                        id: isExiste?.id,
                    },
                    data: {
                        password: await (0, bcrypt_1.hash)(newPassword),
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
        }
        catch (error) {
            console.error(error.status);
            switch (error.status) {
                case 404:
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.NOT_FOUND,
                        message: 'Utilisateur introuvable.',
                        error: 'Not found',
                    }, common_1.HttpStatus.NOT_FOUND);
                    break;
                case 500:
                    throw Error("Une Erreur c'est produit lord de la mise a jours de utilisateur");
                    break;
                case 400:
                    throw new common_1.BadRequestException('Le mots de passe courant est invalide');
                    break;
                default:
                    break;
            }
        }
    }
    remove(id) {
        return `This action removes a #${id} produit`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map