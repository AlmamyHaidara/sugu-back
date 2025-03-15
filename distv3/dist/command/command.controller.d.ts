import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
export declare class CommandController {
    private readonly commandService;
    constructor(commandService: CommandService);
    create(createCammandDto: CreateCommandDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCammandDto: UpdateCommandDto): string;
    remove(id: string): string;
}
