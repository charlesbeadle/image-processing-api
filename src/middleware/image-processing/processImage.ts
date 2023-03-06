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
	try {
		await access(`${imagesPath}/${name}-${size}.jpg`, constants.F_OK);
		next();
	} catch {
		await sharp(`${imagesPath}/${name}.jpg`)
			.resize({
				width: size,
			})
			.toFile(`${imagesPath}/${name}-${size}.jpg`)
			.then(() => {
				next();
			});
	}
};
