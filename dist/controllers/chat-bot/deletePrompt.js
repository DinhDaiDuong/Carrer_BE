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
exports.deletePrompt = void 0;
const ChatBot_1 = require("../../models/ChatBot");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const deletePrompt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const deletedPrompt = yield ChatBot_1.ChatBotModel.findByIdAndDelete(id);
        if (!deletedPrompt) {
            return res.send(Error_1.default.get("DATA_NOT_FOUND"));
        }
        // HANDLE FOREIGN KEYS --
        // Pull the exam id from all groups that have it
        yield Group_1.GroupModel.updateMany({ prompts: id }, { $pull: { prompts: id } });
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
exports.deletePrompt = deletePrompt;
