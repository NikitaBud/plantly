require('dotenv').config();
const express = require('express');
const app = express();

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// connect DB
const connectDB = require('./config/connect');
const authenticateUser = require('./middleware/authentication');