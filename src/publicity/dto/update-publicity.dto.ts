import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicityDto } from './create-publicity.dto';

export class UpdatePublicityDto extends PartialType(CreatePublicityDto) {
  id: number;
}
