import { AccountModel } from "../../models/Account";
import { ChatBotModel } from "../../models/ChatBot";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { EChatBotType } from "../../utils/enums/chat-bot.enum";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";
export const addPrompt = async (
  req: TRequest<IChatBot>,
  res: Response<TResponse<void>>
) => {
  try {
    // Fetch creator and validate account existence
    const creator = await AccountModel.findById(req.userId);
    if (!creator) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    const newPrompt = new ChatBotModel({
      ...req.body,
      creator: creator?.email,
      creatorId: creator?.id,
      type:
        creator?.role === ERole.ADMIN
          ? EChatBotType.SYSTEM
          : EChatBotType.DESIGN,
    });
    await newPrompt.save();
    return res.send({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
