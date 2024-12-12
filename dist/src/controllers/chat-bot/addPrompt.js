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
exports.addPrompt = void 0;
const Account_1 = require("../../models/Account");
const ChatBot_1 = require("../../models/ChatBot");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const chat_bot_enum_1 = require("../../utils/enums/chat-bot.enum");
const addPrompt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch creator and validate account existence
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!creator)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        const newPrompt = new ChatBot_1.ChatBotModel(Object.assign(Object.assign({}, req.body), { creator: creator === null || creator === void 0 ? void 0 : creator.email, creatorId: creator === null || creator === void 0 ? void 0 : creator.id, type: (creator === null || creator === void 0 ? void 0 : creator.role) === account_enum_1.ERole.ADMIN
                ? chat_bot_enum_1.EChatBotType.SYSTEM
                : chat_bot_enum_1.EChatBotType.DESIGN }));
        yield newPrompt.save();
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
exports.addPrompt = addPrompt;
