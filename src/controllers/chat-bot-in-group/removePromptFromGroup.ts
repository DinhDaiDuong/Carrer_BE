import { Response } from "express";
import { ChatBotModel } from "../../models/ChatBot";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
export const removePromptFromGroup = async (
  req: TRequest<{ groupId: number; promptId: number }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { groupId, promptId } = req.body;
    // Check if the prompt exists
    const updatedPrompt = await ChatBotModel.findByIdAndUpdate(
      promptId,
      { $pull: { groupId: groupId } }, // $addToSet ensures the same promptId is not added twice
      { new: true }
    );
    if (!updatedPrompt) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    // Find the group and remove the promptId from the prompts array
    const updatedGroup = await GroupModel.findByIdAndUpdate(
      groupId,
      { $pull: { prompts: promptId } }, // $pull removes the promptId from the prompts array
      { new: true }
    );
    if (!updatedGroup) {
      return res.send(ErrorUtils.get("GROUP_NOT_FOUND"));
    }

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
