"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = exports.jwtConstants = void 0;
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
dotenv.config({ path: process.cwd() + '/.env' });
exports.jwtConstants = {
    secret: process.env.JWT_SECRET,
};
exports.IS_PUBLIC_KEY = 'published';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=constants.js.map