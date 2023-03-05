import { Request, Response, NextFunction } from 'express';
import { access, constants } from 'node:fs';
import path from 'path';
const imagesPath = path.resolve(__dirname, '../../images');
const sharp = require('sharp');

export const processImage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const name: string = req.query.name as string;
	const size: number = parseInt(req.query.size as string);
	try {
		access(`${imagesPath}/${name}-${size}.jpg`, constants.F_OK, async (err) => {
			if (err) {
				console.log('no exist generating');
				await sharp(`${imagesPath}/${name}.jpg`)
					.resize({
						width: size,
					})
					.toFile(`${imagesPath}/${name}-${size}.jpg`)
					.then(() => {
						console.log('file generation successful');
						next();
					});
			} else {
				next();
			}
		});
	} catch (err) {
		next(err);
	}
};
