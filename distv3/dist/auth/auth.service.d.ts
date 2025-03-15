import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { PrixService } from 'src/prix/prix.service';
import { PasswordUpdate } from './constants';
export declare class AuthService {
    private readonly usersService;
    private readonly prixService;
    private readonly jwtService;
    private readonly logger;
    constructor(usersService: UsersService, prixService: PrixService, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<{
        status: number;
        id: number;
        msg: string;
    }>;
    updatePassword(createUserDto: PasswordUpdate): Promise<{
        status: number;
        data: {
            nom: string;
            prenom: string;
            email: string;
            telephone: string;
            profile: import(".prisma/client").$Enums.Profile;
            avatar: string;
            id: number;
        };
        msg: string;
    }>;
    signIn(email: string, pass: string): Promise<{
        access_token: string;
        data: UpdateUserDto;
        date: string;
    }>;
}
