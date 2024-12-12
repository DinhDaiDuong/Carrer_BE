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
exports.addExamToGroup = void 0;
const Exam_1 = require("../../models/Exam");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const addExamToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId, examId } = req.body;
        // Check if the exam exists
        const examExists = yield Exam_1.ExamModel.findById(examId);
        if (!examExists) {
            return res.status(404).send(Error_1.default.get("EXAM_NOT_FOUND"));
        }
        // Check if the group exists
        const groupExists = yield Group_1.GroupModel.findById(groupId);
        if (!groupExists) {
            return res.status(404).send(Error_1.default.get("GROUP_NOT_FOUND"));
        }
        // Add groupId to the exam's groups array (if applicable)
        yield Exam_1.ExamModel.findByIdAndUpdate(examId, { $addToSet: { groupId: groupId } }, // Ensure the schema has `groups` as an array
        { new: true });
        // Add examId to the group’s exams array
        yield Group_1.GroupModel.findByIdAndUpdate(groupId, { $addToSet: { exams: examId } }, { new: true });
        return res.status(200).send({
            code: 200,
            message: "Exam successfully added to the group!",
        });
    }
    catch (error) {
        console.error("Error adding exam to group:", error);
        return res.status(500).send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addExamToGroup = addExamToGroup;
