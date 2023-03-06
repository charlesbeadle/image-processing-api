import express, { Express } from 'express';
import apiRouter from './routes/api';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Image processing API route handler
app.use('/api', apiRouter);

app.listen(port);
