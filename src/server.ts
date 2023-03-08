import express, { Express } from 'express';
import apiRouter from './routes/api';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Image processing API route handler
app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(
		`Try this image processor by opening this URL in your browser: http://localhost:${port}/api/image?name=santamonica&size=300`
	);
});
