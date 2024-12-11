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
exports.addExam = void 0;
const Account_1 = require("../../models/Account");
const Exam_1 = require("../../models/Exam");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const addExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, questions, results, name, category, status, groupId = [], } = req.body;
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!!(creator === null || creator === void 0 ? void 0 : creator.id)) {
            const newExam = new Exam_1.ExamModel({
                type,
                questions,
                results,
                name,
                category,
                status,
                creator: creator === null || creator === void 0 ? void 0 : creator.email,
                updator: creator === null || creator === void 0 ? void 0 : creator.email,
                creatorId: creator === null || creator === void 0 ? void 0 : creator.id,
                groupId: groupId,
            });
            yield newExam.save().then((savedExam) => __awaiter(void 0, void 0, void 0, function* () {
                // HANDLE FOREIGN KEYS
                if (groupId.length > 0) {
                    yield Group_1.GroupModel.updateMany({ _id: { $in: groupId } }, // Filter by group IDs
                    { $push: { exams: savedExam._id } } // Push exam ID to exams array
                    );
                }
                return res.send({
                    code: 200,
                    data: savedExam,
                });
            }));
        }
        else {
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        }
    }
    catch (e) {
        console.log("e", e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addExam = addExam;
