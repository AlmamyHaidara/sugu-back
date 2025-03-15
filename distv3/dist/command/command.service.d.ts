import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
export declare class CommandService {
    create(createCommandDto: CreateCommandDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCammandDto: UpdateCommandDto): string;
    remove(id: number): string;
}
