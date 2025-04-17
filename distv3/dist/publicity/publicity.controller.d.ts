import { PublicityService } from './publicity.service';
import { CreatePublicityDto } from './dto/create-publicity.dto';
import { UpdatePublicityDto } from './dto/update-publicity.dto';
export declare class PublicityController {
    private readonly publicityService;
    constructor(publicityService: PublicityService);
    create(createPublicityDto: CreatePublicityDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePublicityDto: UpdatePublicityDto): string;
    remove(id: string): string;
}
