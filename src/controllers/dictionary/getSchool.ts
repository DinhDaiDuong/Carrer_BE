import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { SchoolModel } from "../../models/School";
export const getSchool = async (
  req: Request<any, any, any, { group: string }>,
  res: Response
) => {
  try {
    const { group } = req.query;
    const dictionary = await SchoolModel.findOne({ group });
    return res.send({
      code: 200,
      data: dictionary,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
