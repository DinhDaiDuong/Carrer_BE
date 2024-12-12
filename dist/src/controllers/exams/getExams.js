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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExams = void 0;
const mongoose_1 = require("mongoose");
const Account_1 = require("../../models/Account");
const Exam_1 = require("../../models/Exam");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const exam_enum_1 = require("../../utils/enums/exam.enum");
const getExams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { size = 10, page = 1, direction = -1, category, name } = _a, queries = __rest(_a, ["size", "page", "direction", "category", "name"]);
        // GET EXAMS FOR ANYNOMOUS
        if (!mongoose_1.Types.ObjectId.isValid(req.userId)) {
            const exams = yield Exam_1.ExamModel.find({ category: exam_enum_1.EExamCategory.SYSTEM });
            return res.send({
                code: 200,
                data: exams,
                message: "Success!",
                pagination: {
                    size: 10,
                    page: 1,
                    totalCounts: 6,
                    totalPages: 1,
                },
            });
        }
        ///
        const user = yield Account_1.AccountModel.findById(new mongoose_1.Types.ObjectId(req.userId));
        if (!user)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        // Build filter query based on user role
        const filterQueries = Object.assign(Object.assign(Object.assign(Object.assign({}, queries), (user.role !== account_enum_1.ERole.ADMIN && { creatorId: req.userId })), (category ? { category } : category)), (name && { name: { $regex: name, $options: "i" } }));
        // Fetch exams with pagination and sorting
        const exams = yield Exam_1.ExamModel.find(filterQueries)
            .sort({ createdAt: direction === 1 ? 1 : -1 })
            .skip((+page - 1) * +size)
            .limit(+size)
            .exec();
        // Get the total count of exams matching the query
        const totalCounts = yield Exam_1.ExamModel.countDocuments(filterQueries);
        // Respond with data and pagination
        return res.send({
            code: 200,
            data: exams,
            message: "Success!",
            pagination: {
                size: +size,
                page: +page,
                totalCounts,
                totalPages: Math.ceil(totalCounts / +size),
            },
        });
    }
    catch (e) {
        console.log("error", e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getExams = getExams;
