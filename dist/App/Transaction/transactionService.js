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
exports.delTransaction = exports.updateBalance = exports.getTransactions = exports.transaction = void 0;
const transactionModel_1 = __importDefault(require("./transactionModel"));
const transaction = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transactionModel_1.default.create(info);
    return result;
});
exports.transaction = transaction;
const getTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transactionModel_1.default.find({})
        .populate("user", "fullName email NID");
    return result;
});
exports.getTransactions = getTransactions;
const updateBalance = (id, balance) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transactionModel_1.default.updateOne({ _id: id }, { $set: balance });
    return result;
});
exports.updateBalance = updateBalance;
const delTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transactionModel_1.default.deleteOne({ _id: id });
    return result;
});
exports.delTransaction = delTransaction;
//# sourceMappingURL=transactionService.js.map