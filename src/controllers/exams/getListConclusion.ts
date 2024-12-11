import { AccountModel } from "../../models/Account";
import { ConclusionModel } from "../../models/Conclusion";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IConclusion } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
import { Response } from "express";
export const getListConclusion = async (
  req: TRequest<any, IConclusion & TPagingParams>,
  res: Response<TResponseWithPagination<IConclusion[] | IErrorData>>
) => {
  try {
    const {
      size = 10,
      page = 1,
      Type,
      Holland,
      SchoolScore,
      direction,
      ...queries
    } = req.query;
    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
      ...(user.role !== ERole.ADMIN &&
        user.role !== ERole.ANONYMOUS && { creatorId: req.userId }),
      ...(Type && { Type: { $regex: Type, $options: "i" } }),
      ...(Holland && { Holland: { $regex: Holland, $options: "i" } }),
      ...(SchoolScore && {
        SchoolScore: { $regex: SchoolScore, $options: "i" },
      }),
    };
    // Fetch exams with pagination and sorting
    const conclusions = await ConclusionModel.find(filterQueries)
      .sort({ createdAt: direction === 1 ? 1 : -1 })
      .skip((+page - 1) * +size)
      .limit(+size)
      .exec();

    // Get the total count of exams matching the query
    const totalCounts = await ConclusionModel.countDocuments(filterQueries);

    // Respond with data and pagination
    return res.send({
      code: 200,
      data: conclusions,
      message: "Success",
      pagination: {
        size: +size,
        page: +page,
        totalCounts,
        totalPages: Math.ceil(totalCounts / +size),
      },
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
