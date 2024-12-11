import { Response } from "express";
import { ChatBotModel } from "../../models/ChatBot";
import ErrorUtils from "../../utils/constant/Error";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import { TRequest, TResponse } from "../../utils/types/meta";

export const getPrompt = async (
  req: TRequest<any, { id: number }>,
  res: Response<TResponse<IChatBot>>
) => {
  try {
    const { id } = req.query;
    const prompt = await ChatBotModel.findById(id);
    if (!prompt) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }
    return res.send({
      code: 200,
      data: prompt,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
