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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const imageExists_1 = require("../../middleware/image-processing/imageExists");
const processImage_1 = require("../../middleware/image-processing/processImage");
const path_1 = __importDefault(require("path"));
// Assign the images path to a variable
const imagesPath = path_1.default.resolve(__dirname, '../../images');
// Create an express app instance
const app = (0, express_1.default)();
// Instantiate a supertest object
const request = (0, supertest_1.default)(app);
// Define the API route for testing purposes
app.get('/api/image', imageExists_1.imageExists, processImage_1.processImage, (req, res) => {
    const name = req.query.name;
    const size = req.query.size;
    res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
});
// Test the API endpoint
describe('GET /api/image?name=santamonica&size=300', () => {
    it('responds with a status code of 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?name=santamonica&size=300');
        expect(response.status).toEqual(200);
    }));
});
