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
exports.getConclusion = void 0;
const Conclusion_1 = require("../../models/Conclusion");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getConclusion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Holland = "R", IQ = "-", EQ = "-", SchoolScore = "A" } = req.body;
        const query = Conclusion_1.ConclusionModel.where({ Holland, IQ, EQ, SchoolScore });
        const conclusion = yield query.findOne();
        if (conclusion) {
            return res.send({
                code: 200,
                data: conclusion,
            });
        }
        return res.send(Error_1.default.get("CONCLUSION_NOT_EXIST"));
    }
    catch (e) {
        console.log(e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getConclusion = getConclusion;
