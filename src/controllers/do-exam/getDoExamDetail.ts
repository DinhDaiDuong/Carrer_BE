import { Response } from "express";
import { ObjectId } from "mongoose";
import { DoExamModal } from "../../models/DoExam";
import ErrorUtils from "../../utils/constant/Error";
import { IDoExam, IDoExamDetailRES } from "../../utils/interfaces/DoExam";
import { TRequest, TResponse } from "../../utils/types/meta";
export const getDoExamDetail = async (
  req: TRequest<any, { id: ObjectId }>,
  res: Response<TResponse<IDoExamDetailRES>>
) => {
  try {
    const { id } = req.query;

    const doExam = await DoExamModal.findById(id);

    // const exam = await ExamModel.findById(doExam?.toObject().examId);
    // if (!exam) {
    //   return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
    // }

    return res.send({
      code: 200,
      data: {
        ...(doExam?.toObject() as IDoExam),
        //questions: exam.questions,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
