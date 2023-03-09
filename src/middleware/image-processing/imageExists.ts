import { Request, Response, NextFunction } from 'express';
import { access, constants } from 'node:fs/promises';
import path from 'path';

// Assign the images path to a variable
const imagesPath: string = path.resolve(__dirname, '../../images');

// Confirm that we have an image by the name of the one requested
export const imageExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const name: string = req.query.name as string;

	// If the name parameter is missing, then respond with an error message
	if (!name) {
		res.status(400);
		res.json({ message: 'Invalid request. The "name" parameter is required.' });
	} else {
		// If the image name requested is not on the list of images available for resizing, then respond with an error message
		try {
			await access(`${imagesPath}/${name}.jpg`, constants.F_OK);
			next();
		} catch {
			res.status(404);
			res.json({
				message: `An image by the name of "${name}" is not on the list of images available for resizing. Images: encenadaport, fjord, icelandwaterfall, palmtunnel, and santamonica are available for resizing.`,
			});
		}
	}
};
