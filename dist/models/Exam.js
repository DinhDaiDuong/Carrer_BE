"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const exam_enum_1 = require("../utils/enums/exam.enum");
// This is the exam of system
//"R", "I", "A", "S", "E", "C", "IQ", "EQ"
const ExamSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["R", "I", "A", "S", "E", "C", "IQ", "EQ"],
    },
    questions: [
        {
            questionTitle: {
                type: String,
                required: true,
            },
            image: {
                type: String,
            },
            imageKey: {
                type: String,
            },
            questionType: {
                type: String,
                required: true,
                enum: exam_enum_1.EQuestionType,
                default: exam_enum_1.EQuestionType.COMBINE,
            },
            options: [
                {
                    image: {
                        type: String,
                    },
                    imageKey: {
                        type: String,
                    },
                    content: {
                        type: String,
                        require: true,
                    },
                    isResult: {
                        type: Boolean,
                        default: false,
                    },
                    standardScore: Number,
                },
            ],
        },
    ],
    results: [
        {
            score: [Number],
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
    ],
    // New Item
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(exam_enum_1.EExamCategory),
        trim: true,
        default: exam_enum_1.EExamCategory.DESIGN,
    },
    creator: {
        type: String,
        required: true,
    },
    updator: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(exam_enum_1.EExamStatus),
        default: exam_enum_1.EExamStatus.UNACTIVATED,
    },
    // FOREIGN KEY
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AccountModel",
    },
    groupId: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "GroupModel",
    },
}, {
    timestamps: true,
    collection: "Exam",
    versionKey: false,
});
const ExamModel = mongoose_1.default.model("ExamModel", ExamSchema);
exports.ExamModel = ExamModel;
