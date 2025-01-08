import { Router } from "express";
import { ISubject } from "../utils/interfaces/SchoolSubjects";
import mongoose from "mongoose";

const SubjectsSchema = new mongoose.Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    vnName: {
      type: String,
      required: true,
      default: "",
    },
    creator: {
      type: String,
      required: true,
    },
    updator: {
      type: String,
    },

    // FOREIGN KEY
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountModel",
    },
  },
  { timestamps: true, collection: "Subject", versionKey: false }
);
const SubjectsModel = mongoose.model("SubjectModel", SubjectsSchema);
export { SubjectsModel };
