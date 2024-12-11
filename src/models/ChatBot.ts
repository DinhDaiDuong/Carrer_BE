import mongoose from "mongoose";
import { EChatBotType } from "../utils/enums/chat-bot.enum";
import { IChatBot } from "../utils/interfaces/ChatBot";

const ChatBotSchema = new mongoose.Schema<IChatBot>(
  {
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
      enum: EChatBotType,
      default: EChatBotType.SYSTEM,
    },
    creator: {
      type: String,
      required: true,
    },
    updator: {
      type: String,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
    },
    groupId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "GroupModel",
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "ChatBot",
    versionKey: false,
  }
);

const ChatBotModel = mongoose.model("ChatBotModel", ChatBotSchema);
export { ChatBotModel };
