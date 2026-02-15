import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { APP_NAME } from "@boilerplate/shared";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", app: APP_NAME });
});

app.get("/", (req, res) => {
  res.json({
    message: `${APP_NAME} Agent Service`,
    version: "1.0.0",
    endpoints: {
      health: "/health",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Agent service running on port ${PORT}`);
});
