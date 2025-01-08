import { Response } from "express";
import { ObjectId } from "mongoose";
import { AccountModel } from "../../models/Account";
import { SubjectsModel } from "../../models/Subjects";
import ErrorUtils from "../../utils/constant/Error";
import { ISubject } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";

export const editSubject = async (
  req: TRequest<ISubject, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    const creator = await AccountModel.findById(req.userId);
    if (!creator) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    const { id } = req.query;
    const subject = await SubjectsModel.findById(id);
    const updatedSubject = { ...subject?.toObject(), ...req.body };
    await SubjectsModel.findByIdAndUpdate(id, updatedSubject);
    return res.send({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
