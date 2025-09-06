import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOneById(id: number): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
    update(id: number, file: Express.Multer.File, updateUserDto: UpdateUserDto): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            prenom: string;
            telephone: string;
            email: string;
            profile: import(".prisma/client").$Enums.Profile;
            avatar: string;
        };
        msg: string;
    }>;
    changePassword(request: {
        email: string;
        password: string;
    }): Promise<{
        status: number;
        data: {
            id: number;
            nom: string;
            prenom: string;
            telephone: string;
            email: string;
            profile: import(".prisma/client").$Enums.Profile;
            avatar: string;
        };
        msg: string;
    }>;
    delete(id: number): Promise<{
        message: string;
        status: number;
    }>;
}
