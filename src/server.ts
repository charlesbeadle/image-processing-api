import express, { Express } from 'express';
import apiRouter from './routes/api';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create an express app instance
const app: Express = express();

// Assign a port value
const port = process.env.PORT || 3000;

// For any route prefixed with /api use the apiRouter
app.use('/api', apiRouter);

// Start the server
app.listen(port, (): void => {
	console.log(
		`Try this image processor by opening this URL in your browser:\nhttp://localhost:${port}/api/image?name=santamonica&size=300`
	);
});
