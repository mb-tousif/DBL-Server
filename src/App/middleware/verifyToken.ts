import jwt from "jsonwebtoken";
const { verify } = jwt;
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

const secret = process.env.JWT_TOKEN || "";

export const verifyToken:RequestHandler = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
        return res.status(401).json({
        status: "fail 👀",
        error: "Access Denied",
        });
    }
    
    try {
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(400).json({
        status: "fail 💥",
        error: "Invalid Token",
        });
    }
};