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
exports.addDoExam = void 0;
const Account_1 = require("../../models/Account");
const DoExam_1 = require("../../models/DoExam");
const Exam_1 = require("../../models/Exam");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const exam_enum_1 = require("../../utils/enums/exam.enum");
const addDoExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { examId, myAnswers, groupId } = req.body;
        // Fetch creator and validate account existence
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!creator)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        // Fetch exam and validate its existence
        const exam = yield Exam_1.ExamModel.findById(examId);
        if (!exam)
            return res.send(Error_1.default.get("EXAM_NOT_FOUND"));
        // SAVE ANSWER
        const savedAnswers = [];
        // CALCULATE SCORE
        const totalScore = ((_a = exam.questions) === null || _a === void 0 ? void 0 : _a.reduce((acc, question) => {
            var _a;
            const myAnswer = myAnswers === null || myAnswers === void 0 ? void 0 : myAnswers.find((item) => item.questionId.toString() === question._id.toString());
            if (!myAnswer)
                return acc;
            const questionScore = ((_a = question.options) === null || _a === void 0 ? void 0 : _a.reduce((sum, option) => {
                var _a, _b;
                const optionId = option._id.toString();
                if (question.questionType === exam_enum_1.EQuestionType.SHORT_ANSWER) {
                    return ((_a = myAnswer === null || myAnswer === void 0 ? void 0 : myAnswer.shortAnswer) === null || _a === void 0 ? void 0 : _a.toLowerCase()) ===
                        option.content.toLocaleLowerCase()
                        ? sum + (option.standardScore || 0)
                        : sum;
                }
                // Add score if the option is correct and selected by the user
                return option.isResult &&
                    ((_b = myAnswer.answers) === null || _b === void 0 ? void 0 : _b.includes(optionId))
                    ? sum + (option.standardScore || 0)
                    : sum;
            }, 0)) || 0; // Default to 0 if options are undefined
            savedAnswers.push(Object.assign(Object.assign({}, myAnswer), { score: questionScore }));
            return acc + questionScore;
        }, 0)) || 0; // Default totalScore to 0 if no questions are present
        // Find Comment of Teacher
        const result = exam === null || exam === void 0 ? void 0 : exam.results.find((item) => {
            var _a, _b;
            return Array.isArray(item.score) &&
                totalScore >= ((_a = item.score) === null || _a === void 0 ? void 0 : _a[0]) &&
                totalScore <= ((_b = item.score) === null || _b === void 0 ? void 0 : _b[1]);
        });
        // SAVE ANSWER TO DB
        const newAnswer = new DoExam_1.DoExamModal({
            examId,
            examName: exam === null || exam === void 0 ? void 0 : exam.name,
            groupId,
            totalScore,
            myAnswers: savedAnswers,
            creator: creator === null || creator === void 0 ? void 0 : creator.email,
            creatorId: creator === null || creator === void 0 ? void 0 : creator.id,
            result: result,
        });
        yield newAnswer.save().then((data) => __awaiter(void 0, void 0, void 0, function* () {
            return res.send({
                code: 200,
                message: "Success!",
                data,
            });
        }));
    }
    catch (error) {
        console.error("Error occurred:", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addDoExam = addDoExam;
