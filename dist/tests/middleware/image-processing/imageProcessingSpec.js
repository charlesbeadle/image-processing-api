"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageExists_1 = require("../../../middleware/image-processing/imageExists");
describe('Image processing middleware', () => {
    const mockReq = {
        query: {
            name: 'santamonica',
        },
    };
    const mockRes = {
        status: jasmine.createSpy('status'),
        send: jasmine.createSpy('send'),
    };
    const mockNextFunction = jasmine.createSpy('next');
    it('calls the next middleware if the requested file name exists', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageExists_1.imageExists)(mockReq, mockRes, mockNextFunction);
        expect(mockNextFunction).toHaveBeenCalled();
    }));
});
