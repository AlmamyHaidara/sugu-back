"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genererMotDePasse = genererMotDePasse;
function genererMotDePasse(longueur = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let motDePasse = '';
    for (let i = 0; i < longueur; i++) {
        const indexAleatoire = Math.floor(Math.random() * caracteres.length);
        motDePasse += caracteres.charAt(indexAleatoire);
    }
    return motDePasse;
}
//# sourceMappingURL=functions.js.map