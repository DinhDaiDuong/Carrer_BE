"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addNews_1 = require("../controllers/news/addNews");
const deleteNews_1 = require("../controllers/news/deleteNews");
const getAllNews_1 = require("../controllers/news/getAllNews");
const getNewestNews_1 = require("../controllers/news/getNewestNews");
const getNews_1 = require("../controllers/news/getNews");
const getNewsCategories_1 = require("../controllers/news/getNewsCategories");
const getNewsDetail_1 = require("../controllers/news/getNewsDetail");
const updateNews_1 = require("../controllers/news/updateNews");
const verifyToken_1 = require("../middlewares/verifyToken");
const newsRouter = (0, express_1.Router)();
newsRouter.get("/", getNews_1.getNews);
newsRouter.get("/detail", getNewsDetail_1.getNewsDetail);
newsRouter.get("/newest", getNewestNews_1.getNewestNews);
newsRouter.get("/all", getAllNews_1.getAllNews);
newsRouter.get("/categories", getNewsCategories_1.getNewsCategories);
newsRouter.post("/addNews", verifyToken_1.verifyToken, addNews_1.addNews);
newsRouter.delete("/deleteNews", verifyToken_1.verifyToken, deleteNews_1.deleteNews);
newsRouter.put("/updateNew", verifyToken_1.verifyToken, updateNews_1.updateNews);
exports.default = newsRouter;