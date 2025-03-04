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
            if (isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Utilisateur existe déjà.',
                    error: 'Conflict',
                }, common_1.HttpStatus.CONFLICT);
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
    findAll() {
        return `This action returns all produit`;
    }
    async findOne(user) {
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
    update(id, updateProduitDto) {
        return `This action updates a #${id} produit`;
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