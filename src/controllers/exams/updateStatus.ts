import { Response } from "express";
import { ObjectId } from "mongoose";
import { AccountModel } from "../../models/Account";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { EExamStatus } from "../../utils/enums/exam.enum";
import { IExam } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";
export const updateStatus = async (
  req: TRequest<{ status: string }, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;
    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    const exam = await ExamModel.findById(id);
    if (!exam) return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));

    if (!req.body.status) {
      return res.send(ErrorUtils.get("ERROR_INVALID"));
    }

    // if (exam?.toObject().creatorId !== user?.id) {
    //   return res.send(ErrorUtils.get("PERMISSION_DENIED"));
    // }

    const updatedData: IExam = {
      ...exam.toObject(),
      status: req.body.status as unknown as EExamStatus,
    };

    await ExamModel.findByIdAndUpdate(id, updatedData, { new: true });
    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.log("e", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
