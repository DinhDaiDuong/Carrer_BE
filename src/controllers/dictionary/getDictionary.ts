import { DictionaryModel } from "../../models/Dictionary";
import { Request, Response } from "express";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
import { IDictionary } from "../../utils/interfaces";
export const getDictionary = async (
  req: TRequest<any, IDictionary & TPagingParams>,
  res: Response<TResponseWithPagination<IDictionary[]> | IErrorData>
) => {
  try {
    const { size = 10, page = 1, ...queries } = req.query;
    // const user = await AccountModel.findById(req.userId);
    // if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
    };

    const dictionary = await DictionaryModel.find(filterQueries);

    const totalCounts = await DictionaryModel.countDocuments(filterQueries);

    return res.send({
      code: 200,
      data: dictionary,
      message: "Success",
      pagination: {
        size: +size,
        page: +page,
        totalCounts,
        totalPages: Math.ceil(totalCounts / +size),
      },
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
