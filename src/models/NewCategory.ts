import mongoose from "mongoose";
import { INewCategory } from "../utils/interfaces/NewCategories";
const NewCategorySchema = new mongoose.Schema<INewCategory>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    listNews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewsModel",
      },
    ],
  },
  { collection: "NewCategory", versionKey: false }
);
const NewCategoryModel = mongoose.model("NewCategoryModel", NewCategorySchema);
export { NewCategoryModel };
