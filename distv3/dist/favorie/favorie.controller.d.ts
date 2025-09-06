import { FavorieService } from './favorie.service';
import { CreateFavorieDto } from './dto/create-favorie.dto';
import { UpdateFavorieDto } from './dto/update-favorie.dto';
export declare class FavorieController {
    private readonly favorieService;
    constructor(favorieService: FavorieService);
    create(createFavorieDto: CreateFavorieDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFavorieDto: UpdateFavorieDto): string;
    remove(id: string): string;
}
