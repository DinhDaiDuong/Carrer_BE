"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoExamModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DoExamSchema = new mongoose_1.default.Schema({
    examId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ExamModal",
    },
    groupId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "GroupModal",
    },
    examName: {
        type: String,
        required: true,
    },
    totalScore: {
        type: Number,
        required: true,
    },
    myAnswers: [
        {
            questionId: mongoose_1.default.Schema.Types.ObjectId,
            score: Number,
            answers: [mongoose_1.default.Schema.Types.ObjectId],
            shortAnswer: String,
        },
    ],
    result: {
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        imageKey: {
            type: String,
        },
        detail: String,
    },
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AccountModel",
    },
    creator: {
        type: String,
        required: true,
    },
}, { timestamps: true, collection: "DoExam", versionKey: false });
const DoExamModal = mongoose_1.default.model("DoExamModal", DoExamSchema);
exports.DoExamModal = DoExamModal;
