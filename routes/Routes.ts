import express from "express";
import { getAllUser, login, signup } from "../controller/userController";

const router = express.Router();

// Authentication Routes
router.get("/allUsers", getAllUser);
router.post("/signup", signup);
router.post("/login", login);

export default router;