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
exports.getNewsCategories = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const NewCategory_1 = require("../../models/NewCategory");
const getNewsCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategories = yield NewCategory_1.NewCategoryModel.find().select({
            categoryName: 1,
        });
        //console.log("categories", newCategories);
        res.status(200).json(newCategories);
    }
    catch (error) {
        res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getNewsCategories = getNewsCategories;
