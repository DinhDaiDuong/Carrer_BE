import { ObjectId } from "mongodb";

export interface INewCategory {
  categoryName: string;
  listNews: ObjectId[];
}
