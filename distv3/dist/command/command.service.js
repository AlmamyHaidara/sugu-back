"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandService = void 0;
const common_1 = require("@nestjs/common");
let CommandService = class CommandService {
    create(createCommandDto) {
        return 'This action adds a new command';
    }
    findAll() {
        return `This action returns all cammand`;
    }
    findOne(id) {
        return `This action returns a #${id} cammand`;
    }
    update(id, updateCammandDto) {
        return `This action updates a #${id} cammand`;
    }
    remove(id) {
        return `This action removes a #${id} cammand`;
    }
};
exports.CommandService = CommandService;
exports.CommandService = CommandService = __decorate([
    (0, common_1.Injectable)()
], CommandService);
//# sourceMappingURL=command.service.js.map