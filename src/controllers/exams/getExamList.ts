import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { ExamModel } from "../../models/Exam";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { EExamStatus } from "../../utils/enums/exam.enum";
import { IExamList, IExamREQ } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

export const getExamList = async (
  req: TRequest<any, IExamREQ & TPagingParams>,
  res: Response<TResponseWithPagination<IExamList[]> | IErrorData>
) => {
  try {
    const {
      size = 10,
      page = 1,
      direction = -1,
      category,
      name,
      startDate,
      endDate,
      id,
      ...queries
    } = req.query;

    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    if (user.role === ERole.ANONYMOUS)
      return res.send(ErrorUtils.get("PERMISSION_DENIED"));

    // Parse startDate and endDate as Date objects if provided
    const dateRange: { $gte?: String; $lte?: String } = {};
    if (startDate)
      dateRange.$gte = new Date(Number(startDate))
        ?.toISOString()
        ?.replace("Z", "+00:00");
    if (endDate)
      dateRange.$lte = new Date(Number(endDate))
        ?.toISOString()
        ?.replace("Z", "+00:00");

    // Build filter query based on user role
    const filterQueries: any = {
      status: [EExamStatus.ACTIVE, EExamStatus.UNACTIVATED],
      ...queries,
      ...(user.role === ERole.TEACHER && { creatorId: req.userId }),
      ...(category ? { category } : category),
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(startDate || endDate ? { createdAt: dateRange } : {}),
      ...(id && { _id: id }),
    };

    // Fetch exams with pagination and sorting
    const exams = await ExamModel.find(filterQueries)
      .select("-questions -results -groupId -creatorId -updator")
      .sort({ createdAt: direction === 1 ? 1 : -1 })
      .skip((+page - 1) * +size)
      .limit(+size)
      .exec();

    // Get the total count of exams matching the query
    const totalCounts = await ExamModel.countDocuments(filterQueries);

    // Respond with data and pagination
    return res.send({
      code: 200,
      data: exams,
      message: "Success!",
      pagination: {
        size: +size,
        page: +page,
        totalCounts,
        totalPages: Math.ceil(totalCounts / +size),
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
