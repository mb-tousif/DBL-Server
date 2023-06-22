"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./App/utilities/server"));
const Routes_1 = __importDefault(require("./App/Routes/Routes"));
dotenv_1.default.config();
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
(0, server_1.default)();
app.get("/", (req, res) => {
    res.send("<h1 style='text-align: center; padding: 20px; color:#753a88'><span style='color: green'>🛢 </span>𝕯𝖊𝖛𝖊𝖑𝖔𝖕𝖊𝖗 𝕭𝖆𝖓𝖐 𝕷𝖙𝖉 Server is successfully running 🚀</h1>");
});
app.use("/api/v1", Routes_1.default);
app.all("*", (req, res) => {
    res.send("<h1 style='text-align: center; padding: 20px; color:red; margin-top: 4rem'>🚦 Requested Route Not Found 💥</h1>");
});
app.listen(port, () => {
    console.log(`Server running on PORT: 🚀 ${port}`);
});
//# sourceMappingURL=index.js.map