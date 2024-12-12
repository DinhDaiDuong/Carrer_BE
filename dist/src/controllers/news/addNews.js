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
exports.addNews = void 0;
const NewCategory_1 = require("../../models/NewCategory");
const News_1 = require("../../models/News");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const addNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, createdAt, content, title, type, image } = req.body;
    //console.log(req.body);
    if (!categoryName || !content || !title || !type || !image) {
        res.status(404).send(Error_1.default.get("ERROR_INVALID"));
        return;
    }
    try {
        const news = new News_1.NewsModel({
            createdAt: createdAt !== null && createdAt !== void 0 ? createdAt : new Date(),
            content,
            title,
            type,
            image,
        });
        yield news.save();
        const newsCategory = yield NewCategory_1.NewCategoryModel.findOne({
            categoryName: categoryName,
        });
        //console.log(newsCategory);
        if (!!newsCategory) {
            newsCategory === null || newsCategory === void 0 ? void 0 : newsCategory.listNews.push(news.id);
            yield (newsCategory === null || newsCategory === void 0 ? void 0 : newsCategory.save());
            res.status(200).json(news);
        }
        else {
            yield NewCategory_1.NewCategoryModel.create({
                categoryName: categoryName,
                listNews: [news.id],
            });
            res.status(200).json(news);
        }
    }
    catch (error) {
        res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addNews = addNews;
