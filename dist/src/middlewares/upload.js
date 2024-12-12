"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
// need to adjust this with api upload file excel
const storageImage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const uploadImages = (0, multer_1.default)({ storage: storageImage });
exports.uploadImages = uploadImages;
exports.default = upload;
