import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { IExam } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";

export const getExam = async (
  req: TRequest<any, { id: number }>,
  res: Response<TResponse<IExam>>
) => {
  try {
    const { id } = req.query;
    const exam = await ExamModel.findById(id).select("-groupId");
    if (!exam) {
      return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
    }
    return res.send({
      code: 200,
      data: exam,
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
