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
exports.deleteTransaction = exports.updateTransaction = exports.postTransaction = exports.getAllTransaction = void 0;
const transactionService_1 = require("./transactionService");
const userModel_1 = __importDefault(require("../User/userModel"));
// Get all Transactions
const getAllTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, transactionService_1.getTransactions)();
        if (transactions.length == 0) {
            return res.status(404).json({
                status: "fail 💥",
                message: "No Transaction found 🕳️",
            });
        }
        res.status(200).json({
            status: "success 🎉",
            data: transactions,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail 💥",
            message: "Did not find any Transaction 🕳️",
        });
    }
});
exports.getAllTransaction = getAllTransaction;
// Post Transaction
const postTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = req.body;
        const result = yield (0, transactionService_1.transaction)(info);
        yield result.save();
        yield userModel_1.default.updateOne({ _id: result.user }, { $push: { transaction: result._id } });
        res.status(200).json({
            status: "success 🎉",
            message: "Transaction saved in DB successfully📣.",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail 💥",
            message: "Transaction did not save 📣.",
        });
    }
});
exports.postTransaction = postTransaction;
// Update Transaction
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const balance = req.body;
        const result = yield (0, transactionService_1.updateBalance)(id, balance);
        res.status(200).json({
            status: "success 🎉",
            data: result,
        });
        ;
    }
    catch (error) {
        res.status(500).json({
            status: "fail 💥",
            message: "Transaction did not Updated 📣.",
        });
    }
});
exports.updateTransaction = updateTransaction;
// Delete API
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, transactionService_1.delTransaction)(id);
        res.status(200).json({
            status: "success 🎉",
            message: "Transaction deleted from DB successfully📣.",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "fail 💥",
            message: "Transaction did not delete 📣.",
        });
    }
});
exports.deleteTransaction = deleteTransaction;
//# sourceMappingURL=transactionController.js.map