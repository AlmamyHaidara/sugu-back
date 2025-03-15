import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<{
        status: number;
        msg: string;
    }>;
    signIn(email: string, pass: string): Promise<{
        access_token: string;
        data: UpdateUserDto;
    }>;
}
