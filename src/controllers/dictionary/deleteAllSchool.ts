import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { SchoolModel } from "../../models/School";
export const deleteAllSchool = async (req: Request, res: Response) => {
  try {
    await SchoolModel.deleteMany({}).then(() => {
      return res.send({ code: 200 });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
