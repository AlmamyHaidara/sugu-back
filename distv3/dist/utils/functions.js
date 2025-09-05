"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genererMotDePasse = genererMotDePasse;
exports.genererCode = genererCode;
function genererMotDePasse(longueur = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let motDePasse = '';
    for (let i = 0; i < longueur; i++) {
        const indexAleatoire = Math.floor(Math.random() * caracteres.length);
        motDePasse += caracteres.charAt(indexAleatoire);
    }
    return motDePasse;
}
function genererCode(longueur = 6) {
    const caracteres = '0123456789';
    let code = '';
    for (let i = 0; i < longueur; i++) {
        const indexAleatoire = Math.floor(Math.random() * caracteres.length);
        code += caracteres.charAt(indexAleatoire);
    }
    return code;
}
//# sourceMappingURL=functions.js.map