import express from 'express';
import cors from 'cors';
import xss from 'xss-clean'
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth.js';

dotenv.config();
const app = express();

// connect DB
// const authenticateUser = require('./middleware/authentication');

app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(xss());

app.route('/').get((req, res) => res.send('<h1>Welcome</h1>'));
app.use('/api/v1/auth', AuthRouter);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${ PORT }`))
  })
  .catch((err) => console.log(err));

