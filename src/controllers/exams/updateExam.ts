import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { IExam } from "../../utils/interfaces/Exam";
import { ExamModel } from "../../models/Exam";
import { ObjectId } from "mongoose";
import { TRequest } from "../../utils/types/meta";
export const updateExam = async (
  req: TRequest<IExam, { id: ObjectId }>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const exam = await ExamModel.findById(id);
    if (!!exam) {
      const updatedData = { ...exam.toObject(), ...req.body };
      await ExamModel.findByIdAndUpdate(id, updatedData, { new: true }).then(
        (result) => {
          return res.send({
            code: 200,
            data: result,
          });
        }
      );
    } else {
      return res.send(ErrorUtils.get("SERVER_ERROR"));
    }
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
