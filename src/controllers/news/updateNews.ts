import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
import { INewsUpdateReq } from "../../utils/interfaces/News";

export const updateNews = async (req: Request, res: Response) => {
  const { id, ...data } = req.body as INewsUpdateReq;
  try {
    const news = await NewsModel.findByIdAndUpdate(id, {
      ...data,
    });
    res.status(200).json(news);
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
