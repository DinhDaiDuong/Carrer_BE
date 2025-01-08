import { Request, Response } from "express";
import { ChatBotModel } from "../../models/ChatBot";
import ErrorUtils from "../../utils/constant/Error";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import { TResponseWithPagination } from "../../utils/types/meta";

export const getPromptsSelect = async (
  req: Request<any, any, any>,
  res: Response<TResponseWithPagination<IChatBot[]>>
) => {
  // Find chatbots where groupId contains the specified ObjectId

  try {
    const prompts = await ChatBotModel.find().select("_id question");
    return res.send({
      code: 200,
      message: "Success!",
      data: prompts,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
