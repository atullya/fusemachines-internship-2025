import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "../db/dbConnection.js";
import userRoutes from "../routes/user.route.js";
import authRoutes from "../routes/auth.route.js";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.5:5173", 
    ],
    credentials: true,
  })
);
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/home", authRoutes);

app.get("/", (req, res) => {
  res.send("Hola Everyone!!");
});
app.listen(PORT, (req, res) => {
  connectDb();
  console.log(`Server started on port ${PORT}`);
});
