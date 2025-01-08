import mongoose from "mongoose";
import { ISchool } from "../utils/interfaces/School";
const SchoolSchema = new mongoose.Schema<ISchool>(
  {
    group: {
      type: String,
      required: true,
      enum: ["A0", "A1", "B", "C", "D1", "D7"],
    },
    schoolList: [
      {
        area: {
          type: String,
          required: true,
        },
        schools: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "School", versionKey: false }
);
const SchoolModel = mongoose.model("School", SchoolSchema);
export { SchoolModel };
