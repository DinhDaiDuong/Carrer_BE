import { Router } from "express";
import examRouter from "./examRouter";
import { verifyToken } from "../middlewares/verifyToken";
import { addDoExam } from "../controllers/do-exam/addDoExam";
import { getDoExam } from "../controllers/do-exam/getDoExam";
import { getDoExamDetail } from "../controllers/do-exam/getDoExamDetail";
import { deleteDoExam } from "../controllers/do-exam/deleteDoExam";
import { updateDoExam } from "../controllers/do-exam/updateDoExam";

const doExamRouter = Router();

// DO EXAM
doExamRouter.get("/", verifyToken, getDoExam);
doExamRouter.post("/", verifyToken, addDoExam);
doExamRouter.get("/detail", verifyToken, getDoExamDetail);
doExamRouter.delete("/", verifyToken, deleteDoExam);
doExamRouter.put("/", verifyToken, updateDoExam);

export default doExamRouter;
