
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, Application } from "express";
import { configureCors } from "./config/corsOption";
import { globalErrorHandler } from "./middleware/errorHandler";
import { requestLogger,addTimeStamp } from "./middleware/customeMiddleware";
import {connectDb} from './db/dbConnection'
import { logger } from "./config/logger";
import { urlVersioning } from "./middleware/apiVersioning";
import { createBasicRateLimiter } from "./middleware/rateLimiting";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
const app:Application = express();


const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(configureCors())
app.use(requestLogger)
app.use(addTimeStamp)
app.use(urlVersioning("v1"))
app.use(createBasicRateLimiter(1000, 15 * 60 * 1000)); 
app.use(cookieParser())

app.use('/api/v1/auth',userRoutes);



app.use(globalErrorHandler)

const startServer = async () => {
  try {
    await connectDb();           
    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Failed to connect DB: " + err);
    process.exit(1);
  }
};

startServer();




// // import dotenv from "dotenv";
// // dotenv.config();
// // import express from "express";
// import express, { Request, Response } from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// // import { connectDb } from "../db/dbConnection.js";
// // import userRoutes from "../routes/user.route.js";
// // import authRoutes from "../routes/auth.route.js";
// const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://192.168.1.5:5173"],
//     credentials: true,
//   })
// );
// const PORT = process.env.PORT || 4000;

// app.use(express.json());
// app.use(cookieParser());

// // app.use("/api/v1/auth", userRoutes);
// // app.use("/api/v1/home", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hola Everyone!!");
// });
// // app.listen(PORT, (req, res) => {
// //   connectDb();
// //   console.log(`Server started on port ${PORT}`);
// // });
