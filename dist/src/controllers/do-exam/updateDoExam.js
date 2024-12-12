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
exports.updateDoExam = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const DoExam_1 = require("../../models/DoExam");
const updateDoExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const doExam = yield DoExam_1.DoExamModal.findById(id);
        if (!doExam) {
            return res.send(Error_1.default.get("EXAM_NOT_FOUND"));
        }
        const updatedData = Object.assign(Object.assign({}, doExam.toObject()), req.body);
        yield DoExam_1.DoExamModal.findByIdAndUpdate(id, updatedData, { new: true });
        return res.send({
            code: 200,
            message: "Success!",
        });
    }
    catch (error) {
        console.error("Error occurred:", error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.updateDoExam = updateDoExam;
