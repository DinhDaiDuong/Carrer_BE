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
exports.executePromptInGroup = void 0;
const generative_ai_1 = require("@google/generative-ai");
const Account_1 = require("../../models/Account");
const ChatBot_1 = require("../../models/ChatBot");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const chat_bot_enum_1 = require("../../utils/enums/chat-bot.enum");
const generateInstruction_1 = require("../chat-bot/data/generateInstruction");
// Access your API key as an environment variable (see "Set up your API key" above)
const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.9,
};
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
});
const executePromptInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { prompt, groupId } = req.body;
        const isLock = false;
        if (!prompt)
            return res.send(Error_1.default.get("PROMT_IS_EMPTY"));
        if (isLock)
            return res.send(Error_1.default.get("LOCK_AI"));
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        if ((user === null || user === void 0 ? void 0 : user.role) === account_enum_1.ERole.STUDENT && !groupId)
            return res.send(Error_1.default.get("PERMISSION_DENIED"));
        let filterQueries = { type: chat_bot_enum_1.EChatBotType.DESIGN };
        // Add groupId to filter queries if provided
        if (groupId) {
            filterQueries = Object.assign(Object.assign({}, filterQueries), { groupId });
        }
        if ((user === null || user === void 0 ? void 0 : user.role) === account_enum_1.ERole.TEACHER) {
            filterQueries = Object.assign(Object.assign({}, filterQueries), { creatorId: user === null || user === void 0 ? void 0 : user.id });
        }
        const prompts = yield ChatBot_1.ChatBotModel.find(filterQueries);
        if (!prompts) {
            return res.send(Error_1.default.get("DATA_NOT_FOUND"));
        }
        const faqs = prompts === null || prompts === void 0 ? void 0 : prompts.map((prompt, index) => `${index + 1}. Question: ${prompt.question}\nAnswer: ${prompt.answer}\nKeywords: ${prompt.keywords}`).join("\n");
        const parts = [{ text: (0, generateInstruction_1.generateInstruction)({ question: prompt, faqs }) }];
        const result = yield model.generateContent({
            contents: [{ role: "user", parts: parts }],
            generationConfig,
        });
        if ((_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.candidates) {
            if (((_b = result === null || result === void 0 ? void 0 : result.response) === null || _b === void 0 ? void 0 : _b.candidates[0].content.parts[0].text) ===
                "Sorry! I do not have enough information to answer this question") {
                const result = yield model.generateContent(prompt);
                const response = yield result.response;
                const text = response.text();
                console.log("text", text);
                return res.send({
                    code: 200,
                    data: text,
                });
            }
        }
        return res.send({
            code: 200,
            data: (_c = result === null || result === void 0 ? void 0 : result.response) === null || _c === void 0 ? void 0 : _c.candidates[0].content.parts[0].text,
        });
    }
    catch (error) {
        console.log(error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.executePromptInGroup = executePromptInGroup;
