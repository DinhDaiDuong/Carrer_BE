import mongoose from "mongoose";
import { IDoExam } from "../utils/interfaces/DoExam";

const DoExamSchema = new mongoose.Schema<IDoExam>(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamModal",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupModal",
    },
    examName: {
      type: String,
      required: true,
    },
    totalScore: {
      type: Number,
      required: true,
    },
    myAnswers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        score: Number,
        answers: [mongoose.Schema.Types.ObjectId],
        shortAnswer: String,
      },
    ],
    result: {
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      imageKey: {
        type: String,
      },
      detail: String,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "DoExam", versionKey: false }
);

const DoExamModal = mongoose.model("DoExamModal", DoExamSchema);
export { DoExamModal };
