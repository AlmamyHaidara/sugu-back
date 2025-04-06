import { AuthService } from './auth.service';
import { PasswordUpdate } from './constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
        data: import("../users/dto/update-user.dto").UpdateUserDto;
        date: string;
    }>;
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
    refreshToken(req: any): Promise<{
        access_token: string;
        data: import("../users/dto/update-user.dto").UpdateUserDto;
        date: string;
    }>;
}
