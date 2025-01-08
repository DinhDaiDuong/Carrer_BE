import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IMajor, TGroup } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

export const getMajors = async (
  req: TRequest<any, { group: TGroup } & IMajor & TPagingParams>,
  res: Response<TResponseWithPagination<IMajor[]> | IErrorData>
) => {
  try {
    const { size = 10, page = 1, name, ...queries } = req.query;

    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
      ...(user.role === ERole.TEACHER && { creatorId: req.userId }),
    };

    // Fetch dictionary based on filter queries
    const dictionary = await DictionaryModel.findOne(filterQueries).lean();

    if (!dictionary) {
      return res.status(404).send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    let filteredMajors: IMajor[] = dictionary?.majors;
    if (name) {
      filteredMajors = filteredMajors?.filter((major) =>
        major.name.includes(name)
      );
    }

    // Extract majors from the dictionary and apply pagination
    const totalMajors = filteredMajors.length;
    const paginatedMajors = filteredMajors
      .slice((page - 1) * size, page * size)
      .map((item) => ({ ...item, groupId: dictionary._id }));

    return res.send({
      code: 200,
      data: paginatedMajors,
      message: "Success!",
      pagination: {
        size: +size,
        page: +page,
        totalCounts: totalMajors,
        totalPages: Math.ceil(totalMajors / +size),
      },
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
