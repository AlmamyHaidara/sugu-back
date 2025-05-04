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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParticulierDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateParticulierDto {
}
exports.CreateParticulierDto = CreateParticulierDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value), { toClassOnly: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateParticulierDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value), { toClassOnly: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateParticulierDto.prototype, "quantiter", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value), { toClassOnly: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateParticulierDto.prototype, "prix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParticulierDto.prototype, "prodName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParticulierDto.prototype, "prodDescription", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Boolean(value), { toClassOnly: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateParticulierDto.prototype, "published", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value), { toClassOnly: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateParticulierDto.prototype, "categorieId", void 0);
//# sourceMappingURL=create-particulier.dto.js.map