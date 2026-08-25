import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import dns from "dns";
import authRouter from "./routes/auth.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.send("hello from auth service");
});

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Auth service started on ${PORT}`);
  connectDB();
});