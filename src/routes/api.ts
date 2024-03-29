import express, { Request, Response, Router } from 'express';
import { processImage } from '../middleware/image-processing/processImage';
import { imageExists } from '../middleware/image-processing/imageExists';
import { Middleware } from '../interfaces/middleware';
import path from 'path';

// Assign the images path to a variable
const imagesPath: string = path.resolve(__dirname, '../images');

// Create a router instance for API route definitions
const apiRouter: Router = express.Router();

// Consolidate middleware into an array
const imageProcess: Middleware[] = [imageExists, processImage];

/*
For any GET request made to /image we are expecting a Name and Size parameter.
The imageExists middleware will determine if an image of the requested name is on the list of images available for resizing.
If so, then the processImage middleware will determine if an image of the requested name and size exists.
If an image matching the request does not exist, then the image will be made, and the server will respond with the
new image file. Otherwise, the server will respond with a cached image matching the request.
*/
apiRouter.get('/image', imageProcess, (req: Request, res: Response): void => {
	const name: string = req.query.name as string;
	const size: string = req.query.size as string;
	res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
});

export default apiRouter;
