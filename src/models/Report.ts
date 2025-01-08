import mongoose from "mongoose";
import { IReport } from "../utils/interfaces/Statistics";

const ReportSchema = new mongoose.Schema<IReport>(
  {
    type: {
      type: String,
      enum: ["R", "I", "A", "S", "E", "C", "IQ", "EQ"],
    },
    score: {
      type: Number,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Report",
    versionKey: false,
  }
);

const ReportModel = mongoose.model("ReportModel", ReportSchema);

export { ReportModel };
