import express from "express";
import { getAllUser, login, signup } from "../App/User/userController";
import { deleteTransaction, getAllTransaction, postTransaction, updateTransaction } from "../App/Transaction/transactionController";
import { verifyToken } from "../App/middleware/verifyToken";

const router = express.Router();

// Authentication Routes
router.get("/allUsers", getAllUser);
router.post("/signup", signup);
router.post("/login", login);

// Transaction Routes
router.get("/allTransactions", getAllTransaction);
router.post("/transaction", verifyToken, postTransaction);
router.put("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);

export default router;