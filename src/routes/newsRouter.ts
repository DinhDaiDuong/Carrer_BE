import { Router } from "express";
import { addNews } from "../controllers/news/addNews";
import { deleteNews } from "../controllers/news/deleteNews";
import { getAllNews } from "../controllers/news/getAllNews";
import { getNewestNews } from "../controllers/news/getNewestNews";
import { getNews } from "../controllers/news/getNews";
import { getNewsCategories } from "../controllers/news/getNewsCategories";
import { getNewsDetail } from "../controllers/news/getNewsDetail";
import { updateNews } from "../controllers/news/updateNews";
import { verifyToken } from "../middlewares/verifyToken";
const newsRouter = Router();
newsRouter.get("/", getNews);
newsRouter.get("/detail", getNewsDetail);
newsRouter.get("/newest", getNewestNews);
newsRouter.get("/all", getAllNews);
newsRouter.get("/categories", getNewsCategories);
newsRouter.post("/addNews", verifyToken, addNews);
newsRouter.delete("/deleteNews", verifyToken, deleteNews);
newsRouter.put("/updateNew", verifyToken, updateNews);
export default newsRouter;