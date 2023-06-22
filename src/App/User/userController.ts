import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { findUserByEmail, generateOTP, getUsers, signupService } from "./userService";
import { generateToken } from "../middleware/jwtToken";

export const signup: RequestHandler = async (req, res) => {
  try {
    const OTP = generateOTP();
    const userInfo = req.body;
    userInfo.OTP = OTP;
    // console.log(userInfo);
    const result = await signupService(userInfo);
    await result.save();
    res.status(200).json({
      status: "success 🎉.",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail 💥",
      message: "Signed up Failed",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail 👀",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail 👀",
        error: "🎭 No user found with this email",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password as string);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail 💥",
        error: "Password is not correct 🤔",
      });
    }

    if (user.status == "Inactive A/C") {
      return res.status(401).json({
        status: "fail 👀",
        error: "User A/C Deactivated. Please contact with Admin",
      });
    }

    const { password: pwd, ...others } = user.toObject();
    const token = generateToken(email)
    res.status(200).json({ 
      status: "success",
      user: others,
      token 
    });
    
  } catch (error) {
    res.status(500).json({
      status: "fail 👀",
      message: error,
    });
  }
};

export const getAllUser: RequestHandler = async (req, res) => {
  try {
    const users = await getUsers();
    if(users.length == 0) {
      return res.status(404).json({
        status: "fail 👀",
        error: "No user found 🎭",
      });
    }
    res.status(200).json({
      status: "success 🎉",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail 💥",
      error: error,
    });
  }
};
