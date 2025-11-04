import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import candidateRoutes from "./routes/candidates";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // optional, if using cookies or auth
  })
);
app.use(express.json());

app.use("/api/candidates", candidateRoutes);
app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ats_dnd";

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}
start();
