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
exports.convertImageToText = void 0;
const tesseract_js_1 = require("tesseract.js");
const convertImageToText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = yield (0, tesseract_js_1.createWorker)("vie");
    const ret = yield worker.recognize("https://r2.easyimg.io/3d8d256av/b5d180b998a936f76fb8.jpg");
    yield worker.terminate();
    //console.table(ret.data.lines);
    return res.json(ret.data.text);
});
exports.convertImageToText = convertImageToText;
