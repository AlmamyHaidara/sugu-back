export declare enum EtatCommand {
    ANNULER = "ANNULER",
    VALIDER = "VALIDER",
    ATTENTE = "ATTENTE"
}
export declare class CreateCommandDto {
    usetilisateurId: number;
    adresseId: number;
    commandeNbr: string;
    ligneCommands: {
        quantiter: number;
        prixId: number;
    }[];
    etat: EtatCommand;
}
