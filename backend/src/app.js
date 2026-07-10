require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const routes = require("./routes/v1");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// Trust Render Proxy
app.set("trust proxy", 1);

/* =====================================================
   CORS Configuration
===================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://ems-api-five.vercel.app",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow Postman, Thunder Client, curl (no origin)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS Not Allowed"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
  ],
};

// Apply CORS BEFORE routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

/* =====================================================
   Security
===================================================== */

app.use(helmet());

/* =====================================================
   Rate Limiter
===================================================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/api", limiter);

/* =====================================================
   Body Parser
===================================================== */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());

/* =====================================================
   Logger
===================================================== */

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* =====================================================
   Root Route
===================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management API is running 🚀",
  });
});

/* =====================================================
   API Routes
===================================================== */

app.use("/api/v1", routes);

/* =====================================================
   Error Handling
===================================================== */

app.use(notFound);

app.use(errorHandler);

module.exports = app;