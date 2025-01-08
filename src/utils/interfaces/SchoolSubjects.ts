import { ObjectId } from "mongoose";
import { ITracking } from ".";

export interface ISubject extends ITracking {
  _id: ObjectId;
  name: string;
  vnName: string;
}
export interface ICaculateSubject extends ISubject {
  value: string;
}
export interface ISubjects {
  subjects: ISubject[];
}

export interface ISubjectREQ {
  name?: string;
  vnName?: string;
}
