import { Injectable } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Injectable()
export class CommandService {
  create(createCommandDto: CreateCommandDto) {
    return 'This action adds a new command';
  }

  findAll() {
    return `This action returns all cammand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cammand`;
  }

  update(id: number, updateCammandDto: UpdateCommandDto) {
    return `This action updates a #${id} cammand`;
  }

  remove(id: number) {
    return `This action removes a #${id} cammand`;
  }
}
