import mongoose from "mongoose";
import { IGroup } from "../utils/interfaces/Group";

const GroupSchema = new mongoose.Schema<IGroup>(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AccountModel",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
    },
    status: {
      type: Number,
      required: true,
    },
    exams: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ExamModel",
      default: [],
    },
    prompts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ChatBotModel",
      default: [],
    },
  },
  { timestamps: true, collection: "Groups", versionKey: false }
);

const GroupModel = mongoose.model("GroupModel", GroupSchema);
export { GroupModel };
