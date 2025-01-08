import { Request, Response } from "express";
import mongoose from "mongoose";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

type TParams = {
  id?: string; // MongoDB ObjectId is a string
  email?: string;
};

export const deleteAccount = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { id, email } = req.query;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send(ErrorUtils.get("EMPTY_DATA"));
    }

    // Attempt to delete the account by ID
    if (id) {
      const deletedAccount = await AccountModel.findByIdAndDelete(id);

      if (!deletedAccount) {
        return res.status(404).send(ErrorUtils.get("EMPTY_DATA"));
      }

      return res.send({ code: 200, message: "Account successfully deleted" });
    } else if (email) {
      const deletedAccount = await AccountModel.findOneAndDelete({
        email,
      });

      if (!deletedAccount) {
        return res.status(404).send(ErrorUtils.get("EMPTY_DATA"));
      }

      return res.send({ code: 200, message: "Account successfully deleted" });
    } else return res.status(404).send(ErrorUtils.get("EMPTY_DATA"));
  } catch (error) {
    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
