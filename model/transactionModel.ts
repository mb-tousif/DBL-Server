import mongoose from "mongoose";
import { ObjectId } from 'mongodb';

export const transactionSchema = new mongoose.Schema({
    id: String,
    userRef: {
        email: String,
        id: {
            type: ObjectId,
            ref: "user",
        }
    },
    type: {
        type: String,
        enum: ["Deposit", "Withdraw", "Balance Transfer", "Tax", "Interest", "Dividend", "Fee", "Service Charge","Other"],
        default: "Deposit",
        required: [true, "Please provide transaction Name"],
    },
    balance: {
        type: Number,
        required: [true, "Please deposit A/C opening Balance"],
    },
    name: {
        type: String,
        enum: ["Income", "Expense", "Business Fund Transfer", "Personal Fund Transfer", "Loan", "Investment", "Insurance", "Tax", "Other"],
        default: "Income",
        required: [true, "Please provide transaction Description"],
    }
});

const Transactions = mongoose.model("transaction", transactionSchema);

export default Transactions;