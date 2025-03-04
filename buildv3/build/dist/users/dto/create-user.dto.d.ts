export declare class CreateUserDto {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    password: string;
    profile: Profile;
}
declare enum Profile {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT",
    BOUTIQUIER = "BOUTIQUIER"
}
export {};
