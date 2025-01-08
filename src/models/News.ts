import mongoose from "mongoose";
import { INews } from "../utils/interfaces/News";

const NewsSchema = new mongoose.Schema<INews>(
  {
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["BREAKING", "NORMAL"],
      default: "NORMAL",
    },
    image: {
      longImage: String,
      shortImage: {
        type: String,
        required: true,
      },
    },
  },
  { collection: "News", versionKey: false }
);
const NewsModel = mongoose.model("NewsModel", NewsSchema);
export { NewsModel };
