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
exports.deleteSubjects = void 0;
const Subjects_1 = require("../../models/Subjects");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const deleteSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const deletedSubjects = yield Subjects_1.SubjectsModel.deleteMany({
            _id: { $in: id },
        });
        if (deletedSubjects.deletedCount === 0) {
            return res.send(Error_1.default.get("SUBJECT_ID_DELETE_NOT_FOUND"));
        }
        return res.send({
            code: 200,
        });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.deleteSubjects = deleteSubjects;
