import { Response } from "express";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { TPagingResponse, TRequest } from "../../utils/types/meta";
type TExamSelect = {
  _id: string;
  name: string;
  type: string;
  category: string;
};
export const getExamSelect = async (
  req: TRequest<any, any>,
  res: Response<Partial<TPagingResponse<TExamSelect[]>>>
) => {
  try {
    const exams = await ExamModel.find({
      category: "DESIGN",
      status: "ACTIVE",
    }).select("_id name type category");
    return res.send({
      code: 200,
      data: exams as unknown as TExamSelect[],
      message: "Success!",
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
