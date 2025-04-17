import { CreateParticulierDto } from './create-particulier.dto';
declare const UpdateParticulierDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateParticulierDto>>;
export declare class UpdateParticulierDto extends UpdateParticulierDto_base {
    id: number;
    produitId: number;
}
export {};
