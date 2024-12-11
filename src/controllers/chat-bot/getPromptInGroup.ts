import { Request, Response } from "express";
import mongoose from "mongoose";
import { ChatBotModel } from "../../models/ChatBot";
import ErrorUtils from "../../utils/constant/Error";
import { IChatBot } from "../../utils/interfaces/ChatBot";
import { TResponseWithPagination } from "../../utils/types/meta";

export const getPromptInGroup = async (
  req: Request<any, any, any, { groupId: string }>,
  res: Response<TResponseWithPagination<IChatBot[]>>
) => {
  const { groupId } = req.query;
  const objectId = new mongoose.Types.ObjectId(groupId);

  // Find chatbots where groupId contains the specified ObjectId

  try {
    const prompts = await ChatBotModel.find({
      groupId: objectId,
    }).select("_id question type createdAt");
    return res.send({
      code: 200,
      message: "Success!",
      data: prompts,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
