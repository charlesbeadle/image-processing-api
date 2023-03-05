import express, { Request, Response } from 'express';
import { processImage } from '../middleware/image-processing/processImage';
import path from 'path';
const imagesPath = path.resolve(__dirname, '../images');

const apiRouter = express.Router();

apiRouter.get('/image', processImage, (req: Request, res: Response) => {
	const name: string = req.query.name as string;
	const size: string = req.query.size as string;
	res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
});

export default apiRouter;
