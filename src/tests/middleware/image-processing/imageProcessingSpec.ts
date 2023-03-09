import type { Request, Response, NextFunction } from 'express';
import { imageExists } from '../../../middleware/image-processing/imageExists';
import { processImage } from '../../../middleware/image-processing/processImage';
import { access, constants, unlink } from 'node:fs/promises';
import path from 'path';

// Assign the images path to a variable
const imagesPath: string = path.resolve(__dirname, '../../../images');

// Test the image processing middleware
describe('Image processing middleware', (): void => {
	// Remove the test image if it already exists
	beforeAll(async (): Promise<void> => {
		try {
			await access(`${imagesPath}/santamonica-300.jpg`, constants.F_OK);
			await unlink(`${imagesPath}/santamonica-300.jpg`);
		} catch {
			return;
		}
	});
	// Remove the test image after all tests have run
	afterAll(async (): Promise<void> => {
		try {
			await access(`${imagesPath}/santamonica-300.jpg`, constants.F_OK);
			await unlink(`${imagesPath}/santamonica-300.jpg`);
		} catch {
			return;
		}
	});
	// Create mock request and response objects
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
	// Create a mock next function
	const mockNextFunction: Partial<NextFunction> = jasmine.createSpy('next');

	it('calls the next function if the requested file name exists', async (): Promise<void> => {
		await imageExists(
			mockReq as Request,
			mockRes as Response,
			mockNextFunction as NextFunction
		);
		expect(mockNextFunction).toHaveBeenCalled();
	});

	it('resizes an image if one is not cached', async (): Promise<void> => {
		await processImage(
			mockReq as Request,
			mockRes as Response,
			mockNextFunction as NextFunction
		);
		const resizedExists = async (): Promise<boolean> => {
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
