"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBotModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chat_bot_enum_1 = require("../utils/enums/chat-bot.enum");
const ChatBotSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: chat_bot_enum_1.EChatBotType,
        default: chat_bot_enum_1.EChatBotType.SYSTEM,
    },
    creator: {
        type: String,
        required: true,
    },
    updator: {
        type: String,
    },
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AccountModel",
    },
    groupId: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "GroupModel",
        default: [],
    },
}, {
    timestamps: true,
    collection: "ChatBot",
    versionKey: false,
});
const ChatBotModel = mongoose_1.default.model("ChatBotModel", ChatBotSchema);
exports.ChatBotModel = ChatBotModel;
