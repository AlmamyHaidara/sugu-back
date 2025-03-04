import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export type User = any;
export declare class UsersService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        status: number;
        msg: string;
    }>;
    findAll(): string;
    findOne(user: {
        email?: string;
        telephone?: null;
    }): Promise<User>;
    findOneById(id: number): Promise<{
        id: number;
    } | null>;
    getCurrentUser(email: string): Promise<User>;
    update(id: number, updateProduitDto: UpdateUserDto): string;
    remove(id: number): string;
}
