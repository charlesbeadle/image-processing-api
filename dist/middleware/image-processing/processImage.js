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
exports.processImage = void 0;
const promises_1 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
const imagesPath = path_1.default.resolve(__dirname, '../../images');
const sharp = require('sharp');
/*
Determine if an image of the specified name and size exists. If the image does exist, then
move on to the next function, otherwise, make it and save it within the images directory.
*/
const processImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const size = parseInt(req.query.size);
    if (!name || !size) {
        res.status(400);
        res.json({
            message: 'Invalid request. The "name" and "size" parameters are required.',
        });
    }
    else if (size < 10) {
        res.status(400);
        res.json({
            message: 'Invalid request. Please provide a size of 10 or above.',
        });
    }
    else {
        try {
            yield (0, promises_1.access)(`${imagesPath}/${name}-${size}.jpg`, promises_1.constants.F_OK);
            next();
        }
        catch (_a) {
            try {
                yield sharp(`${imagesPath}/${name}.jpg`)
                    .resize({
                    width: size,
                })
                    .toFile(`${imagesPath}/${name}-${size}.jpg`)
                    .then(() => {
                    next();
                });
            }
            catch (_b) {
                res.status(500);
                res.json({ message: 'There was an error while processing the image.' });
            }
        }
    }
});
exports.processImage = processImage;
