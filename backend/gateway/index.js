import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/isAuth.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { proxyWithHeaders } from "./utils/proxyWIthHeaders.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from gateway");
});

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use(
  "/api/resume",
  isAuth,
  proxyWithHeaders(process.env.RESUME_SERVICE_URL),
);
app.use(
  "/api/interview",
  isAuth,
  proxyWithHeaders(process.env.INTERVIEW_SERVICE_URL),
);
app.use(
  "/api/roadmap",
  isAuth,
  proxyWithHeaders(process.env.ROADMAP_SERVICE_URL),
);
app.use(
  "/api/billing",
  isAuth,
  proxyWithHeaders(process.env.BILLING_SERVICE_URL),
);
app.get("/api/me", isAuth, getCurrentUser);

app.listen(PORT, () => {
  console.log(`Gateway started on ${PORT}`);
});