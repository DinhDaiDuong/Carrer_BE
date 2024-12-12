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
exports.ocrGemini = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const generative_ai_1 = require("@google/generative-ai");
const convertTextToArray_1 = require("./utils/convertTextToArray");
const OCRDataset_1 = __importDefault(require("./mocks/OCRDataset"));
const API_KEY = process.env.OCR_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
const ocrGemini = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { base64Image, mimeType } = req.body;
        //console.log("base64", base64Image);
        const result = yield model.generateContent([
            OCRDataset_1.default,
            { inlineData: { data: JSON.parse(base64Image), mimeType: mimeType } },
        ]);
        console.log("result", result);
        const text = yield result.response.text();
        console.log("text", text);
        if (text) {
            const response = yield (0, convertTextToArray_1.convertTextToArray)(text);
            return res.send({ code: 200, data: response });
        }
        return res.send(Error_1.default.get("OCR_ERROR"));
    }
    catch (e) {
        console.log("e >>>", e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.ocrGemini = ocrGemini;
