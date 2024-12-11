"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exams_1 = require("../controllers/exams");
const addExamToGroup_1 = require("../controllers/exams-in-group/addExamToGroup");
const removeExamFromGroup_1 = require("../controllers/exams-in-group/removeExamFromGroup");
const addConclusion_1 = require("../controllers/exams/addConclusion");
const deleteConclusion_1 = require("../controllers/exams/deleteConclusion");
const editConclusion_1 = require("../controllers/exams/editConclusion");
const editExam_1 = require("../controllers/exams/editExam");
const getExam_1 = require("../controllers/exams/getExam");
const getExamList_1 = require("../controllers/exams/getExamList");
const getExamSelect_1 = require("../controllers/exams/getExamSelect");
const getListConclusion_1 = require("../controllers/exams/getListConclusion");
const updateStatus_1 = require("../controllers/exams/updateStatus");
const upload_1 = __importDefault(require("../middlewares/upload"));
const verifyToken_1 = require("../middlewares/verifyToken");
const examRouter = (0, express_1.Router)();
// EXAM
examRouter.get("/", verifyToken_1.verifyToken, exams_1.getExams);
examRouter.post("/addExam", verifyToken_1.verifyToken, exams_1.addExam);
examRouter.delete("/deleteExam", verifyToken_1.verifyToken, exams_1.deleteExam);
examRouter.put("/updateExam", verifyToken_1.verifyToken, exams_1.updateExam);
examRouter.post("/uploadConclusion", verifyToken_1.verifyToken, upload_1.default.single("file"), exams_1.uploadConclusion);
examRouter.put("/status", verifyToken_1.verifyToken, updateStatus_1.updateStatus);
examRouter.put("/edit", verifyToken_1.verifyToken, editExam_1.editExam);
// EXAM LIST
examRouter.get("/examList", verifyToken_1.verifyToken, getExamList_1.getExamList);
examRouter.get("/detail", verifyToken_1.verifyToken, getExam_1.getExam);
// EXAM IN GROUP
examRouter.put("/addExamToGroup", verifyToken_1.verifyToken, addExamToGroup_1.addExamToGroup);
examRouter.put("/removeExamFromGroup", verifyToken_1.verifyToken, removeExamFromGroup_1.removeExamFromGroup);
// CONCLUSION
examRouter.post("/conclusion", verifyToken_1.verifyToken, addConclusion_1.addConclusion);
examRouter.delete("/conclusion", verifyToken_1.verifyToken, deleteConclusion_1.deleteConclusion);
examRouter.put("/conclusion", verifyToken_1.verifyToken, editConclusion_1.editConclusion);
examRouter.get("/getListConclusion", verifyToken_1.verifyToken, getListConclusion_1.getListConclusion);
//SELECT
examRouter.get("/exam-select", verifyToken_1.verifyToken, getExamSelect_1.getExamSelect);
examRouter.post("/getConclusion", verifyToken_1.verifyToken, exams_1.getConclusion);
exports.default = examRouter;
