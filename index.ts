import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import cron from "node-cron";
import { connectToDb } from "./src/config/db";
import { deleteBlacklist } from "./src/controllers/accounts/deleteBlacklist";
import accountRouter from "./src/routes/accountRouter";
import chatBotRouter from "./src/routes/chatBotRouter";
import dictionaryRouter from "./src/routes/dictionaryRouter";
import doExamRouter from "./src/routes/doExamRouter";
import examRouter from "./src/routes/examRouter";
import geminiRouter from "./src/routes/geminiRouter";
import groupRouter from "./src/routes/groupRouter";
import newsRouter from "./src/routes/newsRouter";
import ocrRouter from "./src/routes/ocrRouter";
import reportRouter from "./src/routes/reportRouter";
import schoolSubjectRouter from "./src/routes/schoolSubjectRouter";
import uploadRouter from "./src/routes/uploadRouter";
const app = express();

app.use(cors());

// Load environment variables based on NODE_ENV
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
connectToDb();
app.use("/news", newsRouter);
app.use("/exams", examRouter);
app.use("/schoolSubjects", schoolSubjectRouter);
app.use("/geminiAI", geminiRouter);
app.use("/ocr", ocrRouter);
app.use("/dictionary", dictionaryRouter);
app.use("/accounts", accountRouter);
app.use("/groups", groupRouter);
app.use("/do-exam", doExamRouter);
app.use("/chat-bot", chatBotRouter);
app.use("/uploads", uploadRouter);
app.use("/report", reportRouter);
cron.schedule("0,0,1 * * * *", deleteBlacklist);
// if (process.env.NODE_ENV !== "development") {
//   console.log = () => {}; // Remove console.log on staging
// }
app.use("/", (req, res) => {
  res.send("Hello to Career App Server");
});
app.listen(3000, () => {
  console.log("Listening localhost 3000");
});
