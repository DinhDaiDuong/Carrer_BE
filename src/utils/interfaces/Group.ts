import mongoose from "mongoose";

export interface IGroup {
  groupName: string;
  members: mongoose.Schema.Types.ObjectId[];
  owner: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: number; //0: deactive ; 1: active
  exams?: mongoose.Schema.Types.ObjectId[];
  prompts?: mongoose.Schema.Types.ObjectId[];
}
