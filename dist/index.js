"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./src/config/db");
const deleteBlacklist_1 = require("./src/controllers/accounts/deleteBlacklist");
const accountRouter_1 = __importDefault(require("./src/routes/accountRouter"));
const chatBotRouter_1 = __importDefault(require("./src/routes/chatBotRouter"));
const dictionaryRouter_1 = __importDefault(require("./src/routes/dictionaryRouter"));
const doExamRouter_1 = __importDefault(require("./src/routes/doExamRouter"));
const examRouter_1 = __importDefault(require("./src/routes/examRouter"));
const geminiRouter_1 = __importDefault(require("./src/routes/geminiRouter"));
const groupRouter_1 = __importDefault(require("./src/routes/groupRouter"));
const newsRouter_1 = __importDefault(require("./src/routes/newsRouter"));
const ocrRouter_1 = __importDefault(require("./src/routes/ocrRouter"));
const reportRouter_1 = __importDefault(require("./src/routes/reportRouter"));
const schoolSubjectRouter_1 = __importDefault(require("./src/routes/schoolSubjectRouter"));
const uploadRouter_1 = __importDefault(require("./src/routes/uploadRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Load environment variables based on NODE_ENV
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(express_1.default.json());
(0, db_1.connectToDb)();
app.use("/news", newsRouter_1.default);
app.use("/exams", examRouter_1.default);
app.use("/schoolSubjects", schoolSubjectRouter_1.default);
app.use("/geminiAI", geminiRouter_1.default);
app.use("/ocr", ocrRouter_1.default);
app.use("/dictionary", dictionaryRouter_1.default);
app.use("/accounts", accountRouter_1.default);
app.use("/groups", groupRouter_1.default);
app.use("/do-exam", doExamRouter_1.default);
app.use("/chat-bot", chatBotRouter_1.default);
app.use("/uploads", uploadRouter_1.default);
app.use("/report", reportRouter_1.default);
node_cron_1.default.schedule("0,0,1 * * * *", deleteBlacklist_1.deleteBlacklist);
// if (process.env.NODE_ENV !== "development") {
//   console.log = () => {}; // Remove console.log on staging
// }
app.use("/", (req, res) => {
    res.send("Hello to Career App Server");
});
app.listen(3000, () => {
    console.log("Listening localhost 3000");
});
