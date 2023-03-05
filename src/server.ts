import express, { Express } from 'express';
import apiRouter from './routes/api';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`App running on: http://localhost:${port}`);
});
