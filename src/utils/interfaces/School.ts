import { IResponse } from ".";
import { TGroup } from "./Dictionary";
export interface ISchoolByArea {
  area: string;
  schools: string;
}
export interface ISchool {
  group: TGroup;
  schoolList: ISchoolByArea[];
}
export interface ISchoolRequest {
  group: string;
  area: string;
  schools: string;
}
export interface ISchoolResponse extends IResponse {
  data: ISchool[];
}
