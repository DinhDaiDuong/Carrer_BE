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
exports.upload = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const cloudinary_1 = require("cloudinary");
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        console.log("body", req.file);
        if (!req.file) {
            return {
                code: 200,
                message: "Success!",
                data: {
                    key: null,
                    url: null,
                },
            };
        }
        const { folderName } = req.body;
        const imageBase64 = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer) === null || _b === void 0 ? void 0 : _b.toString("base64");
        const dataURL = `data:${(_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype};base64,${imageBase64}`;
        //const newPhoto =
        //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
        // Upload an image
        const uploadResult = yield cloudinary_1.v2.uploader
            .upload(dataURL, {
            folder: folderName || "public",
            access_mode: "authenticated",
        })
            .catch((error) => {
            console.log("error", error);
        });
        //await cloudinary.uploader.destroy("exam/wukgkqydbsptw9xxe62g");
        // const privateURL = await cloudinary.url("exam/wukgkqydbsptw9xxe62g", {
        //   transformation: [
        //     {
        //       fetch_format: "auto",
        //     },
        //   ],
        // });
        // console.log("private url", privateURL);
        console.log("upload result", uploadResult);
        const result = uploadResult;
        return res.send({
            code: 200,
            message: "Success!",
            data: {
                key: result.public_id,
                url: result.secure_url,
            },
        });
    }
    catch (error) {
        console.log("e >>>", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.upload = upload;
