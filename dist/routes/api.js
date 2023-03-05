"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processImage_1 = require("../middleware/image-processing/processImage");
const path_1 = __importDefault(require("path"));
const imagesPath = path_1.default.resolve(__dirname, '../images');
const apiRouter = express_1.default.Router();
apiRouter.get('/image', processImage_1.processImage, (req, res) => {
    const name = req.query.name;
    const size = req.query.size;
    res.sendFile(`${imagesPath}/${name}-${size}.jpg`);
});
exports.default = apiRouter;
