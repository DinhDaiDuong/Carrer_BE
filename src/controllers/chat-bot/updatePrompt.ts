import { ObjectId } from "mongoose";
import { AccountModel } from "../../models/Account";
import { ChatBotModel } from "../../models/ChatBot";
import ErrorUtils from "../../utils/constant/Error";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";

export const updatePrompt = async (
  req: TRequest<IChatBot, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    // Fetch creator and validate account existence
    const creator = await AccountModel.findById(req.userId);
    if (!creator) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    const { id } = req.query;

    const prompt = await ChatBotModel.findById(id);
    if (!prompt) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }
    const updatedPrompt = { ...prompt.toObject(), ...req.body };
    await ChatBotModel.findByIdAndUpdate(id, updatedPrompt);
    return res.send({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
