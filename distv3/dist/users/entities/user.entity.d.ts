export declare class UserEntity {
    private id;
    private nom;
    private prenom;
    private email;
    private password?;
    private createdAt?;
    private updatedAt?;
    constructor(id: number, nom: string, prenom: string, email: string, password?: string, createdAt?: Date, updatedAt?: Date);
}
