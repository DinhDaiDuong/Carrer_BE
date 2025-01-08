import { IResponse, ITracking } from ".";
export type TGroup = "A0" | "A1" | "B" | "C" | "D1" | "D7";
export enum EGroup {
  "A0",
  "A1",
  "B",
  "C",
  "D1",
  "D7",
}
export interface IMajor {
  name: string;
  image: string;
  subjects: string;
  pros: string;
  cons: string;

  // new response
  imageKey?: string;
  groupId?: string;
  _id?: string;
}
export interface IDictionary extends ITracking {
  group: TGroup;
  majors: IMajor[];
}
export interface IDictionaryResponse extends IResponse {
  data: IDictionary[];
}
