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
exports.getNewestNews = void 0;
const News_1 = require("../../models/News");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const dayjs_1 = __importDefault(require("dayjs"));
const getNewestNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield News_1.NewsModel.find({
            createdAt: { $gte: (0, dayjs_1.default)(new Date()).subtract(200, "d") },
        });
        //console.log(news);
        res.status(200).json(news);
    }
    catch (error) {
        res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getNewestNews = getNewestNews;
