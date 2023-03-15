import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_CONNECTION_URL || "";
mongoose.set("strictQuery", true);

const Connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("🗂️ DBL DB is Running");
  } catch (error) {
    console.log("💥 Error while connecting with DB");
    console.log(error);
  }
};

export default Connection;
