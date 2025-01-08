import { Response } from "express";
import { ObjectId } from "mongoose";
import { ConclusionModel } from "../../models/Conclusion";
import ErrorUtils from "../../utils/constant/Error";
import { IConclusion } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";

export const editConclusion = async (
  req: TRequest<IConclusion, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;
    const conclusion = await ConclusionModel.findById(id);
    if (!conclusion) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    const updatedConclusion = { ...conclusion.toObject(), ...req.body };
    await ConclusionModel.findByIdAndUpdate(id, updatedConclusion);
    return res.send({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
