import { Router } from "express";
import { getReport } from "../controllers/statistics/getReport";
import { getStatistics } from "../controllers/statistics/getStatistics";
import { updateReport } from "../controllers/statistics/updateReport";
import { verifyToken } from "../middlewares/verifyToken";

const reportRouter = Router();

reportRouter.get("/statistics", verifyToken, getStatistics);

reportRouter.post("/", verifyToken, updateReport);

reportRouter.get("/", verifyToken, getReport);

export default reportRouter;
