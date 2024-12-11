import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { DoExamModal } from "../../models/DoExam";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IDoExam, IGetDoExamREQ } from "../../utils/interfaces/DoExam";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";
export const getDoExam = async (
  req: TRequest<any, IGetDoExamREQ & TPagingParams>,
  res: Response<TResponseWithPagination<IDoExam[]>>
) => {
  try {
    const {
      size = 10,
      page = 1,
      direction = -1,
      groupId,
      examName,
      creator,
      ...queries
    } = req.query;
    const user = await AccountModel.findById(req.userId);
    if (!user) {
      return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    }

    const filterQueries: any = {
      ...queries,
      ...(creator && { creator: { $regex: creator, $options: "i" } }),
      ...(user.role === ERole.STUDENT && { creatorId: req.userId }),
      ...(examName && { examName: { $regex: examName, $options: "i" } }),
    };

    const doExams = await DoExamModal.find(filterQueries)
      .select("-myAnswers")
      .sort({ createdAt: direction === 1 ? 1 : -1 })
      .skip((+page - 1) * +size)
      .limit(+size)
      .exec();

    // Get the total count of exams matching the query
    const totalCounts = await DoExamModal.countDocuments(filterQueries);

    return res.send({
      code: 200,
      data: doExams,
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
