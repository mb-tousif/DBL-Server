"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign } = jsonwebtoken_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// how to generate jwt from node
// require("crypto").randomBytes(64).toString("hex");
const secret = process.env.JWT_TOKEN || "";
const generateToken = (email) => {
    const payload = {
        email,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: "7 days",
    });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=jwtToken.js.map