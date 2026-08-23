import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import dns from "dns";
import resumeRouter from "./routes/resume.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from resume service");
});

app.use("/", resumeRouter);

app.listen(PORT, () => {
  console.log(`Resume service started on ${PORT}`);
  connectDB();
});
