import jwt from "jsonwebtoken";
const { sign } = jwt;
import dotenv from "dotenv";

dotenv.config();
// how to generate jwt from node
// require("crypto").randomBytes(64).toString("hex");

const secret = process.env.JWT_TOKEN || "";

export const generateToken = (email:string) => {
  const payload = {
    email,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: "7 days",
  });

  return token;
};
