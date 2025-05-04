export declare enum Profile {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT",
    BOUTIQUIER = "BOUTIQUIER"
}
export declare class CreateUserDto {
    nom: string;
    prenom?: string;
    email: string;
    telephone: string;
    password?: string;
    profile?: Profile | 'ADMIN' | 'CLIENT' | 'BOUTIQUIER';
    avatar?: string;
}
