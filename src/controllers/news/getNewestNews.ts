import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
import dayjs from "dayjs";
export const getNewestNews = async (req: Request, res: Response) => {
  try {
    const news = await NewsModel.find({
      createdAt: { $gte: dayjs(new Date()).subtract(200, "d") },
    });
    //console.log(news);
    res.status(200).json(news);
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
