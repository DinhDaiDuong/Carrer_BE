import { ObjectId } from "mongoose";
import { IErrorData } from "../constant/Error";
import { Request } from "express";

export type TResponse<TData> = {
  code: number | string | IErrorData;
  message?: string;
  data?: TData;
};

export type TPagingResponse<TData> = {
  code: number | string | IErrorData;
  message?: string;
  data?: TData;
  totalElements: number;
};

export type TPagingParams = {
  size?: number;
  page?: number;
  direction?: number; // -1: DESC, 1: ASC
};

export type TPaginationRES = {
  size: number;
  page: number;
  totalPages: number;
  totalCounts: number;
};

export type TResponseWithPagination<TData> = {
  code: number | string | IErrorData;
  message?: string;
  data?: TData;
  pagination?: TPaginationRES;
};

export type TRequest<TBody = {}, TQuery = {}> = Request<
  any,
  any,
  TBody,
  TQuery
> & {
  userId?: ObjectId;
};
