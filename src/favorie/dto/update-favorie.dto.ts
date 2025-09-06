import { PartialType } from '@nestjs/mapped-types';
import { CreateFavorieDto } from './create-favorie.dto';

export class UpdateFavorieDto extends PartialType(CreateFavorieDto) {}
