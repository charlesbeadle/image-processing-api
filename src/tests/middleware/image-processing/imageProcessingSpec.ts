import type { Request, Response, NextFunction } from 'express';
import { imageExists } from '../../../middleware/image-processing/imageExists';

describe('Image processing middleware', () => {
	const mockReq: Partial<Request> = {
		query: {
			name: 'santamonica',
		},
	};
	const mockRes: Partial<Response> = {
		status: jasmine.createSpy('status'),
		send: jasmine.createSpy('send'),
	};
	const mockNextFunction: Partial<NextFunction> = jasmine.createSpy('next');

	it('calls the next middleware if the requested file name exists', async () => {
		await imageExists(
			mockReq as Request,
			mockRes as Response,
			mockNextFunction as NextFunction
		);
		expect(mockNextFunction).toHaveBeenCalled();
	});
});
