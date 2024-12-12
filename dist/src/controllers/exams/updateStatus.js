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
exports.updateStatus = void 0;
const Account_1 = require("../../models/Account");
const Exam_1 = require("../../models/Exam");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        const exam = yield Exam_1.ExamModel.findById(id);
        if (!exam)
            return res.send(Error_1.default.get("EXAM_NOT_FOUND"));
        if (!req.body.status) {
            return res.send(Error_1.default.get("ERROR_INVALID"));
        }
        // if (exam?.toObject().creatorId !== user?.id) {
        //   return res.send(ErrorUtils.get("PERMISSION_DENIED"));
        // }
        const updatedData = Object.assign(Object.assign({}, exam.toObject()), { status: req.body.status });
        yield Exam_1.ExamModel.findByIdAndUpdate(id, updatedData, { new: true });
        return res.send({
            code: 200,
            message: "Success!",
        });
    }
    catch (error) {
        console.log("e", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.updateStatus = updateStatus;
