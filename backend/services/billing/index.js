import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import dns from "dns";
import billingRouter from "./routes/billing.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from billing service");
});

app.use("/", billingRouter);

app.listen(PORT, () => {
  console.log(`Billing service started on ${PORT}`);
  connectDB();
});