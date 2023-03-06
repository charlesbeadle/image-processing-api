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
exports.imageExists = void 0;
const promises_1 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
const imagesPath = path_1.default.resolve(__dirname, '../../images');
// Confirm that we have an image by the name of the one requested
const imageExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    try {
        yield (0, promises_1.access)(`${imagesPath}/${name}.jpg`, promises_1.constants.F_OK);
        next();
    }
    catch (_a) {
        res.status(404).send(`<p style="font-size: 18px; font-family: helvetica;">An image by the name of "${name}" is not on the list of images available for resizing.</p>
        <p style="font-size: 18px; font-family: helvetica;">Images: encenadaport, fjord, icelandwaterfall, palmtunnel, and santamonica are available for resizing.</p>`);
    }
});
exports.imageExists = imageExists;
