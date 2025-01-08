import { ObjectId } from "mongoose";

export interface ITracking {
  creatorId?: ObjectId;
  groupId?: ObjectId[];
  createdAt?: Date;
  creator?: string; // email
  updatedAt?: Date;
  updator?: string; // email
}

export interface IResponse {
  code: number | string;
  message?: string;
}

export * from "./Conclusion";
export * from "./Exam";
export * from "./News";
export * from "./School";
export * from "./SchoolSubjects";
export * from "./Dictionary";
export * from "./Account";
export * from "./News";
export * from "./NewCategories";
