import mongoose from "mongoose";

export const transactionSchema = new mongoose.Schema({
    id: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    type: {
        type: String,
        enum: ["Deposit", "Withdraw", "Balance Transfer", "Tax", "Interest", "Dividend", "Fee", "Service Charge","Other"],
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
},
{
  timestamps: true,
});

const Transactions = mongoose.model("transaction", transactionSchema);

export default Transactions;