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
exports.getAllSchool = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const School_1 = require("../../models/School");
const getAllSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dictionary = yield School_1.SchoolModel.find({});
        return res.send({
            code: 200,
            data: dictionary,
        });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getAllSchool = getAllSchool;
