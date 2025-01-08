import { Request, Response } from "express";

import mongoose from "mongoose";
import { ChatBotModel } from "../../models/ChatBot";
import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";

type TParams = {
  id: string; // MongoDB ObjectId is a string
};

export const deleteGroup = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { id } = req.query;
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send(ErrorUtils.get("EMPTY_DATA"));
    }

    // Attempt to delete the account by ID
    const deleteGroup = await GroupModel.findByIdAndDelete(id);

    // HANDLE FOREIGN KEYS
    await ExamModel.updateMany({ groupId: id }, { $pull: { groupId: id } });

    await ChatBotModel.updateMany({ groupId: id }, { $pull: { groupId: id } });
    if (!deleteGroup) {
      return res.status(404).send(ErrorUtils.get("EMPTY_DATA"));
    }

    return res.send({ code: 200, message: "Account successfully deleted" });
  } catch (error) {
    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
