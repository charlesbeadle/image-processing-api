import express, { Express, Request, Response } from 'express';
import supertest from 'supertest';
import { imageExists } from '../../middleware/image-processing/imageExists';
import { processImage } from '../../middleware/image-processing/processImage';
import path from 'path';

// Assign the images path to a variable
const imagesPath: string = path.resolve(__dirname, '../../images');

// Create an express app instance
const app: Express = express();

// Instantiate a supertest object
const request = supertest(app);

// Define the API route for testing purposes
app.get(
	'/api/image',
	imageExists,
	processImage,
	(req: Request, res: Response) => {
		const name: string = req.query.name as string;
		const size: string = req.query.size as string;
		res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
	}
);

// Test the API endpoint
describe('GET /api/image?name=santamonica&size=300', (): void => {
	it('responds with a status code of 200', async (): Promise<void> => {
		const response = await request.get('/api/image?name=santamonica&size=300');
		expect(response.status).toEqual(200);
	});
});
