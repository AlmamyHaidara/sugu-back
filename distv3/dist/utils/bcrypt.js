"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt = require("bcryptjs");
const saltOrRounds = 10;
const hash = async (password) => await bcrypt.hash(password, await bcrypt.genSalt());
exports.hash = hash;
const compare = async (password, hash) => await bcrypt.compare(password, hash);
exports.compare = compare;
//# sourceMappingURL=bcrypt.js.map