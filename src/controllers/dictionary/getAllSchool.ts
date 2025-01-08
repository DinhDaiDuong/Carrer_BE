import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { SchoolModel } from "../../models/School";
export const getAllSchool = async (req: Request, res: Response) => {
  try {
    const dictionary = await SchoolModel.find({});
    return res.send({
      code: 200,
      data: dictionary,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
