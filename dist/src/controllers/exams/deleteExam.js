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
exports.deleteExam = void 0;
const cloudinary_1 = require("cloudinary");
const Exam_1 = require("../../models/Exam");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});
const deleteExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const exam = yield Exam_1.ExamModel.findById(id);
        if (!exam) {
            return res.send(Error_1.default.get("EXAM_NOT_FOUND"));
        }
        // HANDLE DELETE IMAGES ON CLOUDINARY
        const { questions, results } = exam;
        const questionPromises = questions === null || questions === void 0 ? void 0 : questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if ((question === null || question === void 0 ? void 0 : question.imageKey) && (question === null || question === void 0 ? void 0 : question.image)) {
                yield cloudinary_1.v2.uploader.destroy(question.imageKey);
            }
            const optionPromises = (_a = question === null || question === void 0 ? void 0 : question.options) === null || _a === void 0 ? void 0 : _a.map((option) => __awaiter(void 0, void 0, void 0, function* () {
                if ((option === null || option === void 0 ? void 0 : option.imageKey) && (option === null || option === void 0 ? void 0 : option.image)) {
                    yield cloudinary_1.v2.uploader.destroy(option === null || option === void 0 ? void 0 : option.imageKey);
                }
            }));
            yield Promise.all(optionPromises || []);
        }));
        yield Promise.all(questionPromises);
        const resultPromises = results === null || results === void 0 ? void 0 : results.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if ((item === null || item === void 0 ? void 0 : item.imageKey) && (item === null || item === void 0 ? void 0 : item.image)) {
                yield cloudinary_1.v2.uploader.destroy(item.imageKey);
            }
        }));
        yield Promise.all(resultPromises);
        // Corrected deleteOne query to pass the id directly
        const deletedExam = yield Exam_1.ExamModel.deleteOne({ _id: id });
        if (deletedExam.deletedCount === 0) {
            return res.send(Error_1.default.get("EXAM_ID_DELETE_NOT_FOUND"));
        }
        // HANDLE FOREIGN KEYS
        // Pull the exam id from all groups that have it
        yield Group_1.GroupModel.updateMany({ exams: id }, { $pull: { exams: id } });
        return res.send({
            code: 200,
            message: "Success!",
        });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.deleteExam = deleteExam;
