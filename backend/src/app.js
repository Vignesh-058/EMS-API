require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/v1');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

// Trust reverse proxy (required for Render & express-rate-limit)
app.set('trust proxy', 1);

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://ems-api-five.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// Security Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Explicitly handle OPTIONS preflight requests for all routes

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Parsers & Optimization
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes (v1)
app.use('/api/v1', routes);

// 404 & Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
