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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../auth/constants");
let FilesController = class FilesController {
    constructor() {
        this.baseUploadDir = (0, path_1.join)(__dirname, '..', 'uploads');
    }
    async listFilesInFolder(folder) {
        try {
            const targetDir = (0, path_1.resolve)(this.baseUploadDir, folder);
            if (!targetDir.startsWith(this.baseUploadDir)) {
                return [];
            }
            const files = await fs_1.promises.readdir(targetDir);
            return files.map((file) => ({
                name: file,
                url: `/files/${folder}/${file}`,
            }));
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    async getFile(folder, filename, res) {
        const filePath = (0, path_1.resolve)(this.baseUploadDir, folder, filename);
        if (!filePath.startsWith(this.baseUploadDir)) {
            return res.status(400).send('Invalid path');
        }
        res.sendFile(filePath, {}, (err) => {
            if (err) {
                console.error(err);
                res.status(404).send('File not found');
            }
        });
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Get)(':folder'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Param)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "listFilesInFolder", null);
__decorate([
    (0, common_1.Get)(':folder/:filename'),
    (0, constants_1.Public)(),
    __param(0, (0, common_1.Param)('folder')),
    __param(1, (0, common_1.Param)('filename')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files')
], FilesController);
//# sourceMappingURL=files.controller.js.map