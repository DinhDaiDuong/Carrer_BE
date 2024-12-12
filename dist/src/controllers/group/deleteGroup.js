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
exports.deleteGroup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ChatBot_1 = require("../../models/ChatBot");
const Exam_1 = require("../../models/Exam");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).send(Error_1.default.get("EMPTY_DATA"));
        }
        // Attempt to delete the account by ID
        const deleteGroup = yield Group_1.GroupModel.findByIdAndDelete(id);
        // HANDLE FOREIGN KEYS
        yield Exam_1.ExamModel.updateMany({ groupId: id }, { $pull: { groupId: id } });
        yield ChatBot_1.ChatBotModel.updateMany({ groupId: id }, { $pull: { groupId: id } });
        if (!deleteGroup) {
            return res.status(404).send(Error_1.default.get("EMPTY_DATA"));
        }
        return res.send({ code: 200, message: "Account successfully deleted" });
    }
    catch (error) {
        return res.status(500).send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.deleteGroup = deleteGroup;
