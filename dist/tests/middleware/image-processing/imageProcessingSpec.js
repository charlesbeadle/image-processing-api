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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageExists_1 = require("../../../middleware/image-processing/imageExists");
const processImage_1 = require("../../../middleware/image-processing/processImage");
const promises_1 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
// Assign the images path to a variable
const imagesPath = path_1.default.resolve(__dirname, '../../../images');
// Test the image processing middleware
describe('Image processing middleware', () => {
    // Remove the test image if it already exists
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, promises_1.access)(`${imagesPath}/santamonica-300.jpg`, promises_1.constants.F_OK);
            yield (0, promises_1.unlink)(`${imagesPath}/santamonica-300.jpg`);
        }
        catch (_a) {
            return;
        }
    }));
    // Remove the test image after all tests have run
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, promises_1.access)(`${imagesPath}/santamonica-300.jpg`, promises_1.constants.F_OK);
            yield (0, promises_1.unlink)(`${imagesPath}/santamonica-300.jpg`);
        }
        catch (_b) {
            return;
        }
    }));
    // Create mock request and response objects
    const mockReq = {
        query: {
            name: 'santamonica',
            size: '300',
        },
    };
    const mockRes = {
        status: jasmine.createSpy('status'),
        send: jasmine.createSpy('send'),
    };
    // Create a mock next function
    const mockNextFunction = jasmine.createSpy('next');
    it('calls the next function if the requested file name exists', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageExists_1.imageExists)(mockReq, mockRes, mockNextFunction);
        expect(mockNextFunction).toHaveBeenCalled();
    }));
    it('resizes an image if one is not cached', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, processImage_1.processImage)(mockReq, mockRes, mockNextFunction);
        const resizedExists = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, promises_1.access)(`${imagesPath}/santamonica-300.jpg`, promises_1.constants.F_OK);
                return true;
            }
            catch (_c) {
                return false;
            }
        });
        expect(yield resizedExists()).toBe(true);
    }));
});
