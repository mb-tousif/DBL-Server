"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("./userService");
const jwtToken_1 = require("../middleware/jwtToken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OTP = (0, userService_1.generateOTP)();
        const userInfo = req.body;
        userInfo.OTP = OTP;
        // console.log(userInfo);
        const result = yield (0, userService_1.signupService)(userInfo);
        yield result.save();
        res.status(200).json({
            status: "success 🎉.",
            message: "Successfully signed up",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail 💥",
            message: "Signed up Failed",
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail 👀",
                error: "Please provide your credentials",
            });
        }
        const user = yield (0, userService_1.findUserByEmail)(email);
        if (!user) {
            return res.status(401).json({
                status: "fail 👀",
                error: "🎭 No user found with this email",
            });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail 💥",
                error: "Password is not correct 🤔",
            });
        }
        if (user.status == "Inactive A/C") {
            return res.status(401).json({
                status: "fail 👀",
                error: "User A/C Deactivated. Please contact with Admin",
            });
        }
        const _a = user.toObject(), { password: pwd } = _a, others = __rest(_a, ["password"]);
        const token = (0, jwtToken_1.generateToken)(email);
        res.status(200).json({
            status: "success",
            user: others,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail 👀",
            message: error,
        });
    }
});
exports.login = login;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsers)();
        if (users.length == 0) {
            return res.status(404).json({
                status: "fail 👀",
                error: "No user found 🎭",
            });
        }
        res.status(200).json({
            status: "success 🎉",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail 💥",
            error: error,
        });
    }
});
exports.getAllUser = getAllUser;
//# sourceMappingURL=userController.js.map