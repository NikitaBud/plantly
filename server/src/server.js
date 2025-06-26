import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth.js';
import authenticatedUser from './middleware/auth.js';
import speciesRouter from './routes/species.js';
import usersPlantsRouter from './routes/user_plants.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

app.route('/').get((req, res) => res.send('<h1>Welcome</h1>'));
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/species', authenticatedUser, speciesRouter);
app.use('/api/v1/user-plants', authenticatedUser, usersPlantsRouter);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${ PORT }`))
  })
  .catch((err) => console.log(err));

