const cors = require("cors");

const configureCors = () => {
  return cors({
    // origin: Controls which websites can use your API
    origin: (origin, callback) => {
      // List of websites that are allowed to use your API
      const allowedOrigins = [
        "http://localhost:3000", // Your local development site
        "https://yourdomain.com", // Your production website
      ];

      // Check if the request is coming from an allowed website
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Yes, allow this request
      } else {
        callback(new Error("Not allowed by CORS")); // No, block this request
      }
    },

    // methods: What types of requests are allowed (like different actions)
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],

    // allowedHeaders: What extra information can be sent with requests
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],

    // exposedHeaders: What information the browser can see from the response
    exposedHeaders: ["Content-Range", "X-Total-Count"],

    // credentials: Allows cookies to be sent with requests (for login sessions)
    credentials: true,

    // preflightContinue: Let CORS handle everything automatically
    preflightContinue: false,

    // maxAge: Browser remembers these settings for 10 minutes (600 seconds)
    // This prevents asking for permission repeatedly (i.e option request multiple times)
    maxAge: 600,
    optionsSuccessStatus: 204, //staus code for successsul option this is default status code
  });
};
module.exports = { configureCors };
