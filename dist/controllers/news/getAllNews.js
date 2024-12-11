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
exports.getAllNews = void 0;
const News_1 = require("../../models/News");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getAllNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, type, page = 1, size = 10 } = req.query;
    let query = {};
    if (search) {
        const searchPattern = new RegExp(search, "i");
        query["$or"] = [{ title: searchPattern }, { content: searchPattern }];
    }
    if (type) {
        query["type"] = type;
    }
    console.log(query);
    try {
        const news = yield News_1.NewsModel.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        console.log(news);
        const countNews = yield News_1.NewsModel.countDocuments(query);
        //console.log(news);
        res.send({
            code: 200,
            //@ts-expect-error no check
            data: news,
            pagination: {
                size: +size,
                page: +(page - 1),
                totalCounts: countNews,
                totalPages: Math.ceil(countNews / +size),
            },
        });
    }
    catch (error) {
        res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getAllNews = getAllNews;
