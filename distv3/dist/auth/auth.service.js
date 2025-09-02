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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("../utils/bcrypt");
const prix_service_1 = require("../prix/prix.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, prixService, jwtService) {
        this.usersService = usersService;
        this.prixService = prixService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signUp(createUserDto) {
        this.logger.log('Signing up a new user');
        return this.usersService.create(createUserDto);
    }
    async updatePassword(createUserDto) {
        this.logger.log('Signing up a new user');
        return this.usersService.passwordUpdate(createUserDto.userId, createUserDto.newPassword, createUserDto.currentPassword);
    }
    passwordForget(email) {
        this.logger.log(`Password reset requested for email: ${email}`);
        return this.usersService.passwordForget(email);
    }
    async signIn(email, pass) {
        try {
            this.logger.log(`Signing in user with email: ${email}`);
            const user = await this.usersService.findOne({ email });
            if (!user) {
                this.logger.warn(`User not found: ${email}`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const isPasswordValid = await (0, bcrypt_1.compare)(pass, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Invalid password for user: ${email}`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = {
                sub: user.userId,
                username: user.username,
                roles: user?.profile ? [user.profile.toLowerCase()] : [],
            };
            let currentUser = await this.usersService.getCurrentUser(email);
            if (!currentUser) {
                this.logger.warn(`Current user not found: ${email}`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const accessToken = await this.jwtService.signAsync(payload);
            const boutique = await this.prixService.findOneByUserId(user?.id);
            if (boutique) {
                currentUser = { ...currentUser, boutique };
            }
            return {
                access_token: accessToken,
                data: currentUser,
                date: new Date().toString(),
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    async refreshToken(email) {
        try {
            this.logger.log(`Refreshing token for user ID: ${email}`);
            const user = await this.usersService.findOne({ email: email });
            if (!user) {
                this.logger.warn(`User not found for refresh token: ${email}`);
                throw new common_1.UnauthorizedException('User not found');
            }
            const payload = {
                sub: user.userId,
                username: user.username,
                roles: user?.profile ? [user.profile.toLowerCase()] : [],
            };
            let currentUser = await this.usersService.getCurrentUser(user.email);
            if (!currentUser) {
                this.logger.warn(`Current user not found for refresh: ${user.email}`);
                throw new common_1.UnauthorizedException('User not found');
            }
            const accessToken = await this.jwtService.signAsync(payload);
            const boutique = user?.profile === 'BOUTIQUIER'
                ? await this.prixService.findOneByUserId(user?.id)
                : null;
            if (boutique) {
                currentUser = { ...currentUser, boutique };
            }
            return {
                access_token: accessToken,
                data: currentUser,
                date: new Date().toString(),
            };
        }
        catch (error) {
            this.logger.error(`Error refreshing token: ${error.message}`);
            throw new common_1.UnauthorizedException('Failed to refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prix_service_1.PrixService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map