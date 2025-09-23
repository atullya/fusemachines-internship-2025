import cors, { CorsOptionsDelegate, CorsOptions } from "cors";

export const configureCors = () => {
  const options: CorsOptions | CorsOptionsDelegate = {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173", 
        "http://192.168.1.5:5173", 
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["Content-Range", "X-Total-Count"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  };

  return cors(options);
};
