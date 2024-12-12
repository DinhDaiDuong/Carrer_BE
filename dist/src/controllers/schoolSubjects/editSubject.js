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
exports.editSubject = void 0;
const Account_1 = require("../../models/Account");
const Subjects_1 = require("../../models/Subjects");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const editSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!creator)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        const { id } = req.query;
        const subject = yield Subjects_1.SubjectsModel.findById(id);
        const updatedSubject = Object.assign(Object.assign({}, subject === null || subject === void 0 ? void 0 : subject.toObject()), req.body);
        yield Subjects_1.SubjectsModel.findByIdAndUpdate(id, updatedSubject);
        return res.send({
            code: 200,
            message: "Success",
        });
    }
    catch (error) {
        console.error("Error occurred:", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.editSubject = editSubject;
