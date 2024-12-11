import mongoose from "mongoose";
import {
  EExamCategory,
  EExamStatus,
  EQuestionType,
} from "../utils/enums/exam.enum";
import { IExam } from "../utils/interfaces/Exam";

// This is the exam of system

//"R", "I", "A", "S", "E", "C", "IQ", "EQ"
const ExamSchema = new mongoose.Schema<IExam>(
  {
    type: {
      type: String,
      enum: ["R", "I", "A", "S", "E", "C", "IQ", "EQ"],
    },
    questions: [
      {
        questionTitle: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        imageKey: {
          type: String,
        },
        questionType: {
          type: String,
          required: true,
          enum: EQuestionType,
          default: EQuestionType.COMBINE,
        },
        options: [
          {
            image: {
              type: String,
            },
            imageKey: {
              type: String,
            },
            content: {
              type: String,
              require: true,
            },
            isResult: {
              type: Boolean,
              default: false,
            },
            standardScore: Number,
          },
        ],
      },
    ],
    results: [
      {
        score: [Number],
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
    ],

    // New Item
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(EExamCategory),
      trim: true,
      default: EExamCategory.DESIGN,
    },
    creator: {
      type: String,
      required: true,
    },
    updator: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(EExamStatus),
      default: EExamStatus.UNACTIVATED,
    },

    // FOREIGN KEY
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
    },

    groupId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "GroupModel",
    },
  },
  {
    timestamps: true,
    collection: "Exam",
    versionKey: false,
  }
);
const ExamModel = mongoose.model("ExamModel", ExamSchema);
export { ExamModel };
