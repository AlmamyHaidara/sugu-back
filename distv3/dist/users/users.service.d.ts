import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { MailService } from 'src/mail/mail.service';
export type User = any;
export declare class UsersService {
    private readonly prisma;
    private readonly mailService;
    private readonly logger;
    constructor(prisma: PrismaService, mailService: MailService);
    create(createUserDto: CreateUserDto): Promise<{
        status: number;
        id: number;
        msg: string;
    }>;
    createDb(createUserDto: CreateUserDto, db: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>): Promise<number>;
    findAll(): string;
    findOne(user: {
        email?: string;
        telephone?: null;
    }): Promise<User | null>;
    findOneById(id: number): Promise<{
        id: number;
    } | null>;
    getCurrentUser(email: string): Promise<User>;
    update(id: number, updateProduitDto: UpdateUserDto, file?: Express.Multer.File): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            prenom: string;
            telephone: string;
            email: string;
            profile: import(".prisma/client").$Enums.Profile;
            avatar: string;
        };
        msg: string;
    }>;
    passwordUpdate(userId: number, newPassword: string, currentPassword: string): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            prenom: string;
            telephone: string;
            email: string;
            profile: import(".prisma/client").$Enums.Profile;
            avatar: string;
        };
        msg: string;
    }>;
    remove(id: number): Promise<boolean>;
    passwordForget(email: string): Promise<{
        status: HttpStatus;
        data: string;
        message: string;
    }>;
    changePassword(request: {
        email: string;
        password: string;
    }): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            prenom: string;
            telephone: string;
            email: string;
            profile: import(".prisma/client").$Enums.Profile;
            avatar: string;
        };
        msg: string;
    }>;
}
