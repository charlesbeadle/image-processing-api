"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processImage_1 = require("../middleware/image-processing/processImage");
const imageExists_1 = require("../middleware/image-processing/imageExists");
const path_1 = __importDefault(require("path"));
const imagesPath = path_1.default.resolve(__dirname, '../images');
// Router instance for API route definitions
const apiRouter = express_1.default.Router();
const imageProcess = [imageExists_1.imageExists, processImage_1.processImage];
/*
For any GET request made to /image we are expecting a Name and Size parameter.
The imageExists middleware will determine if an image of the requested name is on the list of images available for resizing.
If so, then the processImage middleware will determine if an image of the requested name and size exists.
If an image matching the request does not exist, then the image will be made, and the server will respond with the
new image file. Otherwise, the server will respond with a cached image matching the request.
*/
apiRouter.get('/image', imageProcess, (req, res) => {
    const name = req.query.name;
    const size = req.query.size;
    res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
});
exports.default = apiRouter;
