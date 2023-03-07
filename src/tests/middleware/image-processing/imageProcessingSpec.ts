import { Request, Response, NextFunction } from 'express';
import { imageExists } from '../../../middleware/image-processing/imageExists';

describe('Image Processing Middleware', () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNextFunction: NextFunction;
	beforeEach(() => {
		mockReq = {
			query: {
				name: 'santamonica',
			},
		};
		mockRes = {
			status: jasmine.createSpy('status'),
			send: jasmine.createSpy('send'),
		};
		mockNextFunction = jasmine.createSpy('next');
	});
	it('Calls the next middleware if the requested file name exists', async () => {
		await imageExists(
			mockReq as Request,
			mockRes as Response,
			mockNextFunction as NextFunction
		);
		expect(mockNextFunction).toHaveBeenCalled();
	});
});
