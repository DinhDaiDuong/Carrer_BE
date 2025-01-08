import { Response } from "express";
import { ChatBotModel } from "../../models/ChatBot";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
export const addPromptToGroup = async (
  req: TRequest<{ groupId: number; promptId: number }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { groupId, promptId } = req.body;
    // Check if the question exists
    const updatedPrompt = await ChatBotModel.findByIdAndUpdate(
      promptId,
      { $addToSet: { groupId: groupId } }, // $addToSet ensures the same promptId is not added twice
      { new: true }
    );

    if (!updatedPrompt) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    // Add promptId to the group’s prompts array
    const updatedGroup = await GroupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { prompts: promptId } }, // $addToSet ensures the same promptId is not added twice
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
