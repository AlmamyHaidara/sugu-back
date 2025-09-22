"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavorieController = void 0;
const common_1 = require("@nestjs/common");
const favorie_service_1 = require("./favorie.service");
const create_favorie_dto_1 = require("./dto/create-favorie.dto");
const update_favorie_dto_1 = require("./dto/update-favorie.dto");
const jwt = require("jsonwebtoken");
let FavorieController = class FavorieController {
    constructor(favorieService) {
        this.favorieService = favorieService;
    }
    create(req, createFavorieDto) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Body reçu:', decoded);
        return this.favorieService.create(createFavorieDto);
    }
    findAll(userId) {
        return this.favorieService.findAll(Number(userId));
    }
    findOne(id) {
        return this.favorieService.findOne(+id);
    }
    update(id, updateFavorieDto) {
        return this.favorieService.update(+id, updateFavorieDto);
    }
    remove(id) {
        return this.favorieService.remove(+id);
    }
};
exports.FavorieController = FavorieController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, create_favorie_dto_1.CreateFavorieDto]),
    __metadata("design:returntype", void 0)
], FavorieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavorieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavorieController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_favorie_dto_1.UpdateFavorieDto]),
    __metadata("design:returntype", void 0)
], FavorieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavorieController.prototype, "remove", null);
exports.FavorieController = FavorieController = __decorate([
    (0, common_1.Controller)('favorie'),
    __metadata("design:paramtypes", [favorie_service_1.FavorieService])
], FavorieController);
//# sourceMappingURL=favorie.controller.js.map