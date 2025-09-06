import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class FavorieService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFavorieDto: CreateFavorieDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFavorieDto: UpdateFavorieDto): string;
    remove(id: number): string;
}
