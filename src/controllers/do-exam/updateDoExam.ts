import { ObjectId } from "mongoose";
import { IDoExam } from "../../utils/interfaces/DoExam";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { DoExamModal } from "../../models/DoExam";

export const updateDoExam = async (
  req: TRequest<IDoExam, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;
    const doExam = await DoExamModal.findById(id);
    if (!doExam) {
      return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
    }

    const updatedData = { ...doExam.toObject(), ...req.body };
    await DoExamModal.findByIdAndUpdate(id, updatedData, { new: true });
    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
