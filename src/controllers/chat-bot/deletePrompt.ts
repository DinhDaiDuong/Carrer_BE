import { Response } from "express";
import { ObjectId } from "mongoose";
import { ChatBotModel } from "../../models/ChatBot";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
export const deletePrompt = async (
  req: TRequest<any, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;

    const deletedPrompt = await ChatBotModel.findByIdAndDelete(id);
    if (!deletedPrompt) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    // HANDLE FOREIGN KEYS --

    // Pull the exam id from all groups that have it
    await GroupModel.updateMany({ prompts: id }, { $pull: { prompts: id } });

    return res.send({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
