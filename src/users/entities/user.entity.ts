export class UserEntity {
  private id: number;
  private nom: string;
  private prenom: string;
  private email: string;
  private password?: string;
  private createdAt?: Date = new Date();
  private updatedAt?: Date;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    email: string,
    password?: string,
    createdAt: Date = new Date(),
    updatedAt?: Date,
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
