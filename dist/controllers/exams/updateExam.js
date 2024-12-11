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
exports.updateExam = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const Exam_1 = require("../../models/Exam");
const updateExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const exam = yield Exam_1.ExamModel.findById(id);
        if (!!exam) {
            const updatedData = Object.assign(Object.assign({}, exam.toObject()), req.body);
            yield Exam_1.ExamModel.findByIdAndUpdate(id, updatedData, { new: true }).then((result) => {
                return res.send({
                    code: 200,
                    data: result,
                });
            });
        }
        else {
            return res.send(Error_1.default.get("SERVER_ERROR"));
        }
    }
    catch (e) {
        console.log("e", e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.updateExam = updateExam;
