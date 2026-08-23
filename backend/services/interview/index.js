import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import dns from "dns";
import interviewRouter from "./routes/interview.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from interview service");
});

app.use("/", interviewRouter);

app.listen(PORT, () => {
  console.log(`Interview service started on ${PORT}`);
  connectDB();
});
