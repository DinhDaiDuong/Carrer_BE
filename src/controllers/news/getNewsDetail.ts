import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
export const getNewsDetail = async (req: Request, res: Response) => {
  const { id } = req.query;
  //console.log(id);
  try {
    const newDetail = await NewsModel.findById(id);
    res.status(200).json(newDetail);
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
