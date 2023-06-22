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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.findUserByEmail = exports.signupService = exports.generateOTP = void 0;
const userModel_1 = __importDefault(require("./userModel"));
const generateOTP = () => {
    let OTP = '';
    for (let i = 0; i < 5; i++) {
        OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
};
exports.generateOTP = generateOTP;
const signupService = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.create(userInfo);
    return result;
});
exports.signupService = signupService;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findOne({ email })
        .populate("transaction", "type balance name");
});
exports.findUserByEmail = findUserByEmail;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.find({})
        .populate("transaction", "type amount -_id");
    return result;
});
exports.getUsers = getUsers;
//# sourceMappingURL=userService.js.map