import { Request, Response } from "express";
import { INewsReq } from "../../utils/interfaces/News";
import { NewsModel } from "../../models/News";
import { NewCategoryModel } from "../../models/NewCategory";
import ErrorUtils from "../../utils/constant/Error";

export const deleteNews = async (req: Request, res: Response) => {
  const { newsId, categoryName } = req.body as INewsReq;
  try {
    const newDetete = await NewsModel.deleteOne(NewsModel.findById(newsId));
    if (newDetete.deletedCount === 0) {
      res.send(ErrorUtils.get("NEW_EMPTY"));
      return;
    }
    const news = (await NewsModel.find({})).map((map) => map.id);

    await NewCategoryModel.updateOne(
      { categoryName: categoryName },
      {
        $set: {
          listNews: news,
        },
      }
    );
    return res.status(200);
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
