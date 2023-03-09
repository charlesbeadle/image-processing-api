import { Request, Response, NextFunction } from 'express';
import { access, constants } from 'node:fs/promises';
import path from 'path';
const imagesPath: string = path.resolve(__dirname, '../../images');

// Confirm that we have an image by the name of the one requested
export const imageExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const name: string = req.query.name as string;

	if (!name) {
		res.status(400);
		res.json({ message: 'Invalid request. The "name" parameter is required.' });
	} else {
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
