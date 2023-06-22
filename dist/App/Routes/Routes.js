"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../User/userController");
const transactionController_1 = require("../Transaction/transactionController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
// Authentication Routes
router.get("/allUsers", userController_1.getAllUser);
router.post("/signup", userController_1.signup);
router.post("/login", userController_1.login);
// Transaction Routes
router.get("/allTransactions", transactionController_1.getAllTransaction);
router.post("/transaction", verifyToken_1.verifyToken, transactionController_1.postTransaction);
router.put("/transaction/:id", transactionController_1.updateTransaction);
router.delete("/transaction/:id", transactionController_1.deleteTransaction);
exports.default = router;
//# sourceMappingURL=Routes.js.map