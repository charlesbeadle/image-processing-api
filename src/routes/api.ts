import express, { Request, Response } from 'express';
import { processImage } from '../middleware/image-processing/processImage';
import path from 'path';
const imagesPath = path.resolve(__dirname, '../images');

// Router instance for API route definitions
const apiRouter = express.Router();

/*
For any GET request made to /image we are expecting a Name and Size parameter.
The processImage middleware will determine if an image of the requested name and size exists.
If the image does not exist, then the image will be made, and the server will respond with the
new image file. Otherwise, if the image already exists, then the server will respond with a cached image
matching the request.
*/
apiRouter.get('/image', processImage, (req: Request, res: Response) => {
	const name: string = req.query.name as string;
	const size: string = req.query.size as string;
	res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
});

export default apiRouter;
