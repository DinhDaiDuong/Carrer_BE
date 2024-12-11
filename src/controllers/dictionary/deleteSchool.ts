import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
export const deleteSchool = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
