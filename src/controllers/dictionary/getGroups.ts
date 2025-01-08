import { Response } from "express";
import { ObjectId } from "mongoose";
import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils from "../../utils/constant/Error";
import { TGroup } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";

export const getGroups = async (
  req: TRequest<any>,
  res: Response<TResponse<{ group: TGroup; _id: ObjectId }[]>>
) => {
  try {
    // Query to fetch only _id and group fields from each document
    const groups = await DictionaryModel.find({}, { _id: 1, group: 1 }).lean();
    return res.send({
      code: 200,
      data: groups as any,
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
