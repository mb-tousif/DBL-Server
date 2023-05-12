import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./App/utilities/server";
import router from "./App/Routes/Routes";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

Connection();

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center; padding: 20px; color:#753a88'><span style='color: green'>🛢 </span>𝕯𝖊𝖛𝖊𝖑𝖔𝖕𝖊𝖗 𝕭𝖆𝖓𝖐 𝕷𝖙𝖉 Server is successfully running 🚀</h1>"
  );
});

app.use("/api/v1", router);

app.all("*", (req, res) => {
  res.send(
    "<h1 style='text-align: center; padding: 20px; color:red; margin-top: 4rem'>🚦 Requested Route Not Found 💥</h1>"
  );
});

app.listen(port, () => {
  console.log(`Server running on PORT: 🚀 ${port}`);
});