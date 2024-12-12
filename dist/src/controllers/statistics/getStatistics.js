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
exports.getStatistics = void 0;
const Account_1 = require("../../models/Account");
const Exam_1 = require("../../models/Exam");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user)
            return res.send(Error_1.default.get("PERMISSION_DENIED"));
        const filterQueries = Object.assign({}, (user.role === account_enum_1.ERole.TEACHER && { creatorId: req.userId }));
        const exams = yield Exam_1.ExamModel.countDocuments(filterQueries);
        const groups = yield Group_1.GroupModel.countDocuments(filterQueries);
        const teachers = yield Account_1.AccountModel.countDocuments({ role: account_enum_1.ERole.TEACHER });
        const students = yield Account_1.AccountModel.countDocuments(Object.assign({ role: account_enum_1.ERole.STUDENT }, filterQueries));
        return res.send({
            code: 200,
            data: {
                exams: exams,
                groups,
                teachers: user.role === account_enum_1.ERole.ADMIN ? teachers : undefined,
                students,
            },
        });
    }
    catch (error) {
        console.log("error", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getStatistics = getStatistics;
