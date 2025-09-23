require("dotenv").config();
const express = require("express");
const { configureCors } = require("./config/corsConfig");
const cookieParser = require("cookie-parser");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware");
const {
  globalErrorHandler,
  asyncHandler,
  APIError,
} = require("./middleware/errorHandler");
const { urlVersioning } = require("./middleware/apiVersioning");
const userRoute = require("./routes/user.route");
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const logger = require("./config/logger");
const { connectDb } = require("./utils/db");
const authRoute = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware

app.use(express.json());
app.use(configureCors());
app.use(requestLogger);
app.use(addTimeStamp);
app.use(cookieParser());
// Now these routes work:

app.use(urlVersioning("v1")); // Only allow API v1 endpoints
app.use(createBasicRateLimiter(100, 15 * 60 * 1000)); //100 request per 15 minutes
app.use("/api/v1", userRoute);
app.use("/api/v1", authRoute);

//error handler
app.use(globalErrorHandler);
app.listen(PORT, () => {
  logger.info(`Server is running at ${PORT}`);
  connectDb();
});
