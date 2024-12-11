import { IResponse } from ".";

export interface IImageNew {
  longImage: string;
  shortImage: string;
}
export interface INews {
  createdAt: Date;
  title: string;
  content: string;
  type: string;
  image: IImageNew;
}
export interface INewsBodyReq {
  createdAt?: Date;
  title: string;
  content: string;
  type: string;
  image?: IImageNew;
  categoryName: string;
}
export interface INewsUpdateReq {
  createdAt?: Date;
  title: string;
  content: string;
  type: string;
  image?: IImageNew;
  id: string;
}
export interface INewsReq {
  newsId: string;
  categoryName: string;
}

export interface INewResponse extends IResponse {
  data: INews[];
  totalCount: number;
}
