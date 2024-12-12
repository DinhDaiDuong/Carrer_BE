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
exports.deleteNews = void 0;
const News_1 = require("../../models/News");
const NewCategory_1 = require("../../models/NewCategory");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newsId, categoryName } = req.body;
    try {
        const newDetete = yield News_1.NewsModel.deleteOne(News_1.NewsModel.findById(newsId));
        if (newDetete.deletedCount === 0) {
            res.send(Error_1.default.get("NEW_EMPTY"));
            return;
        }
        const news = (yield News_1.NewsModel.find({})).map((map) => map.id);
        yield NewCategory_1.NewCategoryModel.updateOne({ categoryName: categoryName }, {
            $set: {
                listNews: news,
            },
        });
        return res.status(200);
    }
    catch (error) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.deleteNews = deleteNews;
