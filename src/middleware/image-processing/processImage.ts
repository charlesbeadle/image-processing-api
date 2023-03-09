import { Request, Response, NextFunction } from 'express';
import { access, constants } from 'node:fs/promises';
import path from 'path';
const imagesPath = path.resolve(__dirname, '../../images');
const sharp = require('sharp');

/*
Determine if an image of the specified name and size exists. If the image does exist, then
move on to the next function, otherwise, make it and save it within the images directory.
*/
export const processImage = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const name: string = req.query.name as string;
	const size: number = parseInt(req.query.size as string);

	if (!name || !size) {
		res.status(400);
		res.json({
			message:
				'Invalid request. The "name" and "size" parameters are required.',
		});
	} else if (size < 10) {
		res.status(400);
		res.json({
			message: 'Invalid request. Please provide a size of 10 or above.',
		});
	} else {
		try {
			await access(`${imagesPath}/${name}-${size}.jpg`, constants.F_OK);
			next();
		} catch {
			try {
				await sharp(`${imagesPath}/${name}.jpg`)
					.resize({
						width: size,
					})
					.toFile(`${imagesPath}/${name}-${size}.jpg`)
					.then(() => {
						next();
					});
			} catch {
				res.status(500);
				res.json({ message: 'There was an error while processing the image.' });
			}
		}
	}
};
