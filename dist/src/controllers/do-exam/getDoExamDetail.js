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
exports.getDoExamDetail = void 0;
const DoExam_1 = require("../../models/DoExam");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getDoExamDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const doExam = yield DoExam_1.DoExamModal.findById(id);
        // const exam = await ExamModel.findById(doExam?.toObject().examId);
        // if (!exam) {
        //   return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
        // }
        return res.send({
            code: 200,
            data: Object.assign({}, doExam === null || doExam === void 0 ? void 0 : doExam.toObject()),
        });
    }
    catch (error) {
        console.log("error", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getDoExamDetail = getDoExamDetail;
