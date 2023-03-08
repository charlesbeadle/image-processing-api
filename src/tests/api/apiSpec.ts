import express, { Express, Request, Response } from 'express';
import supertest from 'supertest';
import { imageExists } from '../../middleware/image-processing/imageExists';
import { processImage } from '../../middleware/image-processing/processImage';
import path from 'path';

const imagesPath = path.resolve(__dirname, '../../images');

const app: Express = express();

const request = supertest(app);

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

describe('GET /api/image', () => {
	it('responds with a status code of 200', async () => {
		const response: any = await request.get(
			'/api/image?name=santamonica&size=300'
		);
		expect(response.status).toEqual(200);
	});
});
