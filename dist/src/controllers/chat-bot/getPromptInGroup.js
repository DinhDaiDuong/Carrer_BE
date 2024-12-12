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
exports.getPromptInGroup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ChatBot_1 = require("../../models/ChatBot");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getPromptInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.query;
    const objectId = new mongoose_1.default.Types.ObjectId(groupId);
    // Find chatbots where groupId contains the specified ObjectId
    try {
        const prompts = yield ChatBot_1.ChatBotModel.find({
            groupId: objectId,
        }).select("_id question type createdAt");
        return res.send({
            code: 200,
            message: "Success!",
            data: prompts,
        });
    }
    catch (error) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getPromptInGroup = getPromptInGroup;
