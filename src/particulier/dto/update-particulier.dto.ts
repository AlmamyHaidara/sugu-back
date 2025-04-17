import { PartialType } from '@nestjs/mapped-types';
import { CreateParticulierDto } from './create-particulier.dto';
import { IsString } from 'class-validator';
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateParticulierDto extends PartialType(CreateParticulierDto) {
  id: number;
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  produitId: number;
}
