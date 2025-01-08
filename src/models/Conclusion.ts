import mongoose from "mongoose";
import { IConclusion } from "../utils/interfaces/Conclusion";
const ConclusionSchema = new mongoose.Schema<IConclusion>(
  {
    Type: {
      type: String,
      required: false,
    },
    Holland: {
      type: String,
      enum: ["R", "I", "A", "S", "E", "C"],
    },
    SchoolScore: {
      type: String,
      enum: ["A", "B", "C", "D"],
    },
    IQ: {
      type: String,
      required: true,
    },
    EQ: {
      type: String,
      required: true,
    },
    Field: {
      type: String,
      required: true,
    },
    Jobs: {
      type: String,
      required: true,
    },
    Conclusion: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    updator: {
      type: String,
      required: true,
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
  { timestamps: true, collection: "Conclusion", versionKey: false }
);
const ConclusionModel = mongoose.model("ConclusionModel", ConclusionSchema);
export { ConclusionModel };
