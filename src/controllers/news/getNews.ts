import { Response, Request } from "express";
import { NewCategoryModel } from "../../models/NewCategory";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
export const getNews = async (req: Request, res: Response) => {
  const { id, page = 1, size = 7 } = req.query;
  try {
    const category = await NewCategoryModel.findById(id);
    const totalCount = category?.listNews.length || 0;
    await NewCategoryModel.findById(id)
      .populate({
        path: "listNews",
        model: NewsModel,
        options: {
          sort: { createdAt: -1 },
          skip: (+page - 1) * +size,
          //skip: 0,
          limit: +size,
        },
      })
      .then((category) => {
        return res.send({
          code: 200,
          data: category?.listNews,
          totalCount: totalCount,
        });
      });
  } catch (e) {
    console.log(e);
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
