import type { Request, Response, NextFunction } from 'express';
import { imageExists } from '../../../middleware/image-processing/imageExists';
import { processImage } from '../../../middleware/image-processing/processImage';
import { access, constants, unlink } from 'node:fs/promises';
import path from 'path';

const imagesPath = path.resolve(__dirname, '../../../images');

describe('Image processing middleware', () => {
	beforeAll(async () => {
		try {
			await access(`${imagesPath}/santamonica-300.jpg`, constants.F_OK);
			await unlink(`${imagesPath}/santamonica-300.jpg`);
		} catch {
			return;
		}
	});
	afterAll(async () => {
		try {
			await access(`${imagesPath}/santamonica-300.jpg`, constants.F_OK);
			await unlink(`${imagesPath}/santamonica-300.jpg`);
		} catch {
			return;
		}
	});
	const mockReq: Partial<Request> = {
		query: {
			name: 'santamonica',
			size: '300',
		},
	};
	const mockRes: Partial<Response> = {
		status: jasmine.createSpy('status'),
		send: jasmine.createSpy('send'),
	};
	const mockNextFunction: Partial<NextFunction> = jasmine.createSpy('next');

	it('calls the next function if the requested file name exists', async () => {
		await imageExists(
			mockReq as Request,
			mockRes as Response,
			mockNextFunction as NextFunction
		);
		expect(mockNextFunction).toHaveBeenCalled();
	});

	it('resizes an image if one is not cached', async () => {
		await processImage(
			mockReq as Request,
			mockRes as Response,
			mockNextFunction as NextFunction
		);
		const resizedExists = async () => {
			try {
				await access(`${imagesPath}/santamonica-300.jpg`, constants.F_OK);
				return true;
			} catch {
				return false;
			}
		};
		expect(await resizedExists()).toBe(true);
	});
});
