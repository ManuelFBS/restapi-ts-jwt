"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = (savedUser) => {
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.SECRET_KEY_TOKEN || 'tokentest', { expiresIn: '12h' });
    return token;
};
exports.token = token;
//# sourceMappingURL=token.js.map