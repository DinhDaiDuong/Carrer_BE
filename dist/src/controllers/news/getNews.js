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
exports.getNews = void 0;
const NewCategory_1 = require("../../models/NewCategory");
const News_1 = require("../../models/News");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, page = 1, size = 7 } = req.query;
    try {
        const category = yield NewCategory_1.NewCategoryModel.findById(id);
        const totalCount = (category === null || category === void 0 ? void 0 : category.listNews.length) || 0;
        yield NewCategory_1.NewCategoryModel.findById(id)
            .populate({
            path: "listNews",
            model: News_1.NewsModel,
            options: {
                sort: { createdAt: -1 },
                skip: (+page - 1) * +size,
                //skip: 0,
                limit: +size,
            },
        })
            .then((category) => {
            return res.send({
                code: 200,
                data: category === null || category === void 0 ? void 0 : category.listNews,
                totalCount: totalCount,
            });
        });
    }
    catch (e) {
        console.log(e);
        res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getNews = getNews;
