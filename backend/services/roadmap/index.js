import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import dns from "dns";
import roadmapRouter from "./routes/roadmap.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from roadmap service");
});

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.use("/", roadmapRouter);

app.listen(PORT, () => {
  console.log(`Roadmap service started on ${PORT}`);
  connectDB();
});