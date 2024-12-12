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
exports.removeExamFromGroup = void 0;
const Exam_1 = require("../../models/Exam");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const removeExamFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId, examId } = req.body;
        // Check if the exam exists
        const updatedExam = yield Exam_1.ExamModel.findByIdAndUpdate(examId, { $pull: { groupId: groupId } }, // $addToSet ensures the same examId is not added twice
        { new: true });
        if (!updatedExam) {
            return res.send(Error_1.default.get("EXAM_NOT_FOUND"));
        }
        // Find the group and remove the examId from the exams array
        const updatedGroup = yield Group_1.GroupModel.findByIdAndUpdate(groupId, { $pull: { exams: examId } }, // $pull removes the examId from the exams array
        { new: true });
        if (!updatedGroup) {
            return res.send(Error_1.default.get("GROUP_NOT_FOUND"));
        }
        return res.send({
            code: 200,
            message: "Success!",
        });
    }
    catch (error) {
        console.log("error", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.removeExamFromGroup = removeExamFromGroup;
