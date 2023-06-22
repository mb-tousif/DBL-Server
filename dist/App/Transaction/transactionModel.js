"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.transactionSchema = new mongoose_1.default.Schema({
    id: String,
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
    },
    type: {
        type: String,
        enum: ["Deposit", "Withdraw", "Balance Transfer", "Tax", "Interest", "Dividend", "Fee", "Service Charge", "Other"],
        default: "Deposit",
        required: [true, "Please provide transaction Name"],
    },
    amount: {
        type: Number,
        required: [true, "Please deposit A/C opening Balance"],
    },
    name: {
        type: String,
        enum: ["Income", "Expense", "BFT", "PFT", "Loan", "Investment", "Insurance", "Tax", "Other"],
        // "Business Fund Transfer" = BFT, "Personal Fund Transfer" = PFT
        default: "Income",
        required: [true, "Please provide transaction Description"],
    },
}, {
    timestamps: true,
});
const Transactions = mongoose_1.default.model("transaction", exports.transactionSchema);
exports.default = Transactions;
//# sourceMappingURL=transactionModel.js.map