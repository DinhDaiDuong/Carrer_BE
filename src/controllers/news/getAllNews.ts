import { Request, Response } from "express";
import { NewsModel } from "../../models/News";
import ErrorUtils from "../../utils/constant/Error";
import { TPagingParams, TResponseWithPagination } from "../../utils/types/meta";
type Image = {
  longImage: string;
  shortImage: string;
};

type NewsItem = {
  _id: string;
  createdAt: string;
  title: string;
  content: string;
  type: "BREAKING" | string; // Assuming other types could be added
  image: Image;
};
type TParams = {
  search: string;
  type: string;
};
export const getAllNews = async (
  req: Request<any, any, any, any, TParams & Partial<TPagingParams>>,
  res: Response<TResponseWithPagination<NewsItem[]>>
) => {
  const { search, type, page = 1, size = 10 } = req.query;
  let query: any = {};
  if (search) {
    const searchPattern = new RegExp(search, "i");
    query["$or"] = [{ title: searchPattern }, { content: searchPattern }];
  }
  if (type) {
    query["type"] = type;
  }
  console.log(query);
  try {
    const news = await NewsModel.find(query)
      .skip((page - 1) * size)
      .limit(size)
      .exec();
    console.log(news);
    const countNews = await NewsModel.countDocuments(query);
    //console.log(news);
    res.send({
      code: 200,
      //@ts-expect-error no check
      data: news,
      pagination: {
        size: +size,
        page: +(page - 1),
        totalCounts: countNews,
        totalPages: Math.ceil(countNews / +size),
      },
    });
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
