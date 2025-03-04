import { AuthService } from './auth.service';
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
        msg: string;
    }>;
}
