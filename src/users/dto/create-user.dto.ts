import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    nom: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    prenom: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    telephone:string;

    @IsNotEmpty()
    @IsString()
    password: string;

    // @IsDateString()
    // @IsOptional()
    // createdAt?: Date = new Date();

    // @IsDateString()
    // @IsOptional()
    // updatedAt?: Date;
}
