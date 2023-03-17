import express from "express";
import { getAllUser, login, signup } from "../controller/userController";
import { deleteTransaction, getAllTransaction, postTransaction, updateTransaction } from "../controller/transactionController";

const router = express.Router();

// Authentication Routes
router.get("/allUsers", getAllUser);
router.post("/signup", signup);
router.post("/login", login);

// Transaction Routes
router.get("/allTransactions", getAllTransaction);
router.post("/transaction", postTransaction);
router.put("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);

export default router;