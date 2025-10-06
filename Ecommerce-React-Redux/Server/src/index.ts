import * as dotenv from "dotenv";
dotenv.config()

import express,{Request,Response} from "express";
import { configureCors } from "./config/corsOption";
import { globalErrorHandler } from "./middleware/errorHandler";
import { requestLogger,addTimeStamp } from "./middleware/customeMiddleware";
import cookieParser from "cookie-parser"
import { connectDb } from "./db/dbConnect";
import { logger } from "./config/logger";
import userRoute from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(configureCors())
app.use(requestLogger)
app.use(addTimeStamp)
app.use(cookieParser())

app.use('/api/v1',userRoute)

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