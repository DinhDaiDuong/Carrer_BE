import { Response } from "express";
import { Types } from "mongoose";
import { AccountModel } from "../../models/Account";
import { ChatBotModel } from "../../models/ChatBot";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

export const getPrompts = async (
  req: TRequest<any, IChatBot & TPagingParams>,
  res: Response<TResponseWithPagination<IChatBot[]>>
) => {
  try {
    if (!Types.ObjectId.isValid(req.userId as any)) {
      return res.send(ErrorUtils.get("PERMISSION_DENIED"));
    }

    const user = await AccountModel.findById(
      new Types.ObjectId(req.userId as unknown as string)
    );
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    const {
      size = 10,
      page = 1,
      direction = -1,
      question,
      answer,
      ...queries
    } = req.query;

    // Build filter query based on user role
    const filterQueries: any = {
      ...queries,
      ...(user.role !== ERole.ADMIN && { creatorId: req.userId }), // If user role is ADMIN => Get all datas. // If user role is TEACHER => just get their data
      ...(question && { question: { $regex: question, $options: "i" } }),
      ...(answer && { answer: { $regex: answer, $options: "i" } }),
    };

    // Get the total count of exams matching the query
    const totalCounts = await ChatBotModel.countDocuments(filterQueries);

    // Fetch exams with pagination and sorting
    const prompts = await ChatBotModel.find(filterQueries)
      .select("-creatorId -updatedAt -type -groupId")
      .sort({ createdAt: direction === 1 ? 1 : -1 })
      .skip((+page - 1) * +size)
      .limit(+size)
      .exec();

    // Respond with data and pagination
    return res.send({
      code: 200,
      data: prompts,
      message: "Success!",
      pagination: {
        size: +size,
        page: +page,
        totalCounts,
        totalPages: Math.ceil(totalCounts / +size),
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
