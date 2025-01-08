import { Router } from "express";
import {
  addExam,
  deleteExam,
  getConclusion,
  getExams,
  updateExam,
  uploadConclusion,
} from "../controllers/exams";
import { addExamToGroup } from "../controllers/exams-in-group/addExamToGroup";
import { removeExamFromGroup } from "../controllers/exams-in-group/removeExamFromGroup";
import { addConclusion } from "../controllers/exams/addConclusion";
import { deleteConclusion } from "../controllers/exams/deleteConclusion";
import { editConclusion } from "../controllers/exams/editConclusion";
import { editExam } from "../controllers/exams/editExam";
import { getExam } from "../controllers/exams/getExam";
import { getExamList } from "../controllers/exams/getExamList";
import { getExamSelect } from "../controllers/exams/getExamSelect";
import { getListConclusion } from "../controllers/exams/getListConclusion";
import { updateStatus } from "../controllers/exams/updateStatus";
import upload from "../middlewares/upload";
import { verifyToken } from "../middlewares/verifyToken";
const examRouter = Router();

// EXAM
examRouter.get("/", verifyToken, getExams);
examRouter.post("/addExam", verifyToken, addExam);
examRouter.delete("/deleteExam", verifyToken, deleteExam);
examRouter.put("/updateExam", verifyToken, updateExam);
examRouter.post(
  "/uploadConclusion",
  verifyToken,
  upload.single("file"),
  uploadConclusion
);
examRouter.put("/status", verifyToken, updateStatus);
examRouter.put("/edit", verifyToken, editExam);

// EXAM LIST
examRouter.get("/examList", verifyToken, getExamList);
examRouter.get("/detail", verifyToken, getExam);

// EXAM IN GROUP
examRouter.put("/addExamToGroup", verifyToken, addExamToGroup);
examRouter.put("/removeExamFromGroup", verifyToken, removeExamFromGroup);

// CONCLUSION
examRouter.post("/conclusion", verifyToken, addConclusion);
examRouter.delete("/conclusion", verifyToken, deleteConclusion);
examRouter.put("/conclusion", verifyToken, editConclusion);
examRouter.get("/getListConclusion", verifyToken, getListConclusion);

//SELECT
examRouter.get("/exam-select", verifyToken, getExamSelect);
examRouter.post("/getConclusion", verifyToken, getConclusion);
export default examRouter;
