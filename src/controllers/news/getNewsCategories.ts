import { Request, Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { NewCategoryModel } from "../../models/NewCategory";
export const getNewsCategories = async (req: Request, res: Response) => {
  try {
    const newCategories = await NewCategoryModel.find().select({
      categoryName: 1,
    });
    //console.log("categories", newCategories);
    res.status(200).json(newCategories);
  } catch (error) {
    res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
