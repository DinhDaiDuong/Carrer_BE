import { ObjectId } from "mongoose";
import { IResponse, ITracking } from ".";
import { EExamCategory, EExamStatus, EQuestionType } from "../enums/exam.enum";

export type TExam = "R" | "I" | "A" | "S" | "E" | "C" | "IQ" | "EQ";
export interface IOption {
  _id: ObjectId;
  image?: string;
  content: string;
  isResult?: boolean;
  standardScore?: number;

  // new response
  imageKey?: string;
}
export interface IQuestion {
  _id: ObjectId;
  questionTitle: string;
  image?: string;
  options?: IOption[];

  // new item => for Design Exam
  questionType?: EQuestionType;
  imageKey?: string;
}
export interface IResult {
  score?: number | string | number[];
  content: string;
  image?: string;
  detail?: string;

  // new response
  imageKey?: string;
}
export interface IExam extends ITracking {
  type?: TExam;
  questions: IQuestion[];
  results: IResult[];

  // new response
  name?: string;
  category: EExamCategory;
  status?: EExamStatus;
}
export interface IExamResponse extends IResponse {
  data: IExam[];
}

export interface IExamREQ {
  category?: EExamCategory;
  name?: string;
  type?: TExam;
  creator?: string;
  updator?: string;
  status?: EExamStatus;

  // For group
  groupId?: number;

  // For Filter
  id?: string;
  startDate?: number;
  endDate?: number;
}

// EXAM LIST
export interface IExamList extends ITracking {
  type?: TExam;
  name?: string;
  category: EExamCategory;
  status?: EExamStatus;
}
