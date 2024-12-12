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
exports.getNewsDetail = void 0;
const News_1 = require("../../models/News");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getNewsDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    //console.log(id);
    try {
        const newDetail = yield News_1.NewsModel.findById(id);
        res.status(200).json(newDetail);
    }
    catch (error) {
        res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getNewsDetail = getNewsDetail;
