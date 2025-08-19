"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(id, nom, prenom, email, password, createdAt = new Date(), updatedAt) {
        this.createdAt = new Date();
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map