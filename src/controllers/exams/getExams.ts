import { Response } from "express";
import { Types } from "mongoose";
import { AccountModel } from "../../models/Account";
import { ExamModel } from "../../models/Exam";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { EExamCategory } from "../../utils/enums/exam.enum";
import { IExam, IExamREQ } from "../../utils/interfaces";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

export const getExams = async (
  req: TRequest<any, IExamREQ & TPagingParams>,
  res: Response<TResponseWithPagination<IExam[]> | IErrorData>
) => {
  try {
    const {
      size = 10,
      page = 1,
      direction = -1,
      category,
      name,
      ...queries
    } = req.query;

    // GET EXAMS FOR ANYNOMOUS
    if (!Types.ObjectId.isValid(req.userId as any)) {
      const exams = await ExamModel.find({ category: EExamCategory.SYSTEM });
      return res.send({
        code: 200,
        data: exams,
        message: "Success!",
        pagination: {
          size: 10,
          page: 1,
          totalCounts: 6,
          totalPages: 1,
        },
      });
    }
    ///

    const user = await AccountModel.findById(
      new Types.ObjectId(req.userId as unknown as string)
    );
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
      ...(user.role !== ERole.ADMIN && { creatorId: req.userId }), // If user role is ADMIN => Get all exams. // If user role is TEACHER => just get their exams
      ...(category ? { category } : category),
      ...(name && { name: { $regex: name, $options: "i" } }),
    };

    // Fetch exams with pagination and sorting
    const exams = await ExamModel.find(filterQueries)
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
  } catch (e) {
    console.log("error", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
