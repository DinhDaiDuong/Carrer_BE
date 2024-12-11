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
exports.getDoExam = void 0;
const Account_1 = require("../../models/Account");
const DoExam_1 = require("../../models/DoExam");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const getDoExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { size = 10, page = 1, direction = -1, groupId, examName, creator } = _a, queries = __rest(_a, ["size", "page", "direction", "groupId", "examName", "creator"]);
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user) {
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        }
        const filterQueries = Object.assign(Object.assign(Object.assign(Object.assign({}, queries), (creator && { creator: { $regex: creator, $options: "i" } })), (user.role === account_enum_1.ERole.STUDENT && { creatorId: req.userId })), (examName && { examName: { $regex: examName, $options: "i" } }));
        const doExams = yield DoExam_1.DoExamModal.find(filterQueries)
            .select("-myAnswers")
            .sort({ createdAt: direction === 1 ? 1 : -1 })
            .skip((+page - 1) * +size)
            .limit(+size)
            .exec();
        // Get the total count of exams matching the query
        const totalCounts = yield DoExam_1.DoExamModal.countDocuments(filterQueries);
        return res.send({
            code: 200,
            data: doExams,
            message: "Success!",
            pagination: {
                size: +size,
                page: +page,
                totalCounts,
                totalPages: Math.ceil(totalCounts / +size),
            },
        });
    }
    catch (error) {
        console.log("error", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getDoExam = getDoExam;
