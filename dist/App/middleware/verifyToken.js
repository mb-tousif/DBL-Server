"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { verify } = jsonwebtoken_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_TOKEN || "";
const verifyToken = (req, res, next) => {
    var _a, _b, _c;
    const token = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")) === null || _c === void 0 ? void 0 : _c[1];
    if (!token) {
        return res.status(401).json({
            status: "fail 👀",
            error: "Access Denied",
        });
    }
    try {
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(400).json({
            status: "fail 💥",
            error: "Invalid Token",
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map