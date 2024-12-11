import { Response } from "express";
import { ConclusionModel } from "../../models/Conclusion";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
export const deleteConclusion = async (
  req: TRequest<any, { id: string }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;

    const deletedConclusion = await ConclusionModel.findByIdAndDelete(id);
    if (!deletedConclusion) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.log(error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
