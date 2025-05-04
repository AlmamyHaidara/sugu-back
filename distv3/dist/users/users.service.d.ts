import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
export type User = any;
export declare class UsersService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
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
            nom: string;
            prenom: string;
            email: string;
            telephone: string;
            profile: import("@prisma/client").$Enums.Profile;
            avatar: string;
            id: number;
        };
        msg: string;
    }>;
    passwordUpdate(userId: number, newPassword: string, currentPassword: string): Promise<{
        status: number;
        data: {
            nom: string;
            prenom: string;
            email: string;
            telephone: string;
            profile: import("@prisma/client").$Enums.Profile;
            avatar: string;
            id: number;
        };
        msg: string;
    }>;
    remove(id: number): string;
}
