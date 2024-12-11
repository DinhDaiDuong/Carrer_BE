import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IStatistics } from "../../utils/interfaces/Statistics";
import { TRequest, TResponse } from "../../utils/types/meta";

export const getStatistics = async (
  req: TRequest<any>,
  res: Response<TResponse<IStatistics>>
) => {
  try {
    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("PERMISSION_DENIED"));

    const filterQueries: any = {
      ...(user.role === ERole.TEACHER && { creatorId: req.userId }),
    };

    const exams = await ExamModel.countDocuments(filterQueries);
    const groups = await GroupModel.countDocuments(filterQueries);
    const teachers = await AccountModel.countDocuments({ role: ERole.TEACHER });
    const students = await AccountModel.countDocuments({
      role: ERole.STUDENT,
      ...filterQueries,
    });

    return res.send({
      code: 200,
      data: {
        exams: exams,
        groups,
        teachers: user.role === ERole.ADMIN ? teachers : undefined,
        students,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
