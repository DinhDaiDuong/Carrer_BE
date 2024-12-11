import { DoExamModal } from "../../models/DoExam";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";
export const deleteDoExam = async (
  req: TRequest<any, { id: number }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;
    const deleteDoExam = await DoExamModal.deleteOne({ _id: id });
    if (deleteDoExam.deletedCount === 0) {
      return res.send(ErrorUtils.get("EXAM_ID_DELETE_NOT_FOUND")!);
    }
    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
