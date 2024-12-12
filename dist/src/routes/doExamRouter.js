"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const addDoExam_1 = require("../controllers/do-exam/addDoExam");
const getDoExam_1 = require("../controllers/do-exam/getDoExam");
const getDoExamDetail_1 = require("../controllers/do-exam/getDoExamDetail");
const deleteDoExam_1 = require("../controllers/do-exam/deleteDoExam");
const updateDoExam_1 = require("../controllers/do-exam/updateDoExam");
const doExamRouter = (0, express_1.Router)();
// DO EXAM
doExamRouter.get("/", verifyToken_1.verifyToken, getDoExam_1.getDoExam);
doExamRouter.post("/", verifyToken_1.verifyToken, addDoExam_1.addDoExam);
doExamRouter.get("/detail", verifyToken_1.verifyToken, getDoExamDetail_1.getDoExamDetail);
doExamRouter.delete("/", verifyToken_1.verifyToken, deleteDoExam_1.deleteDoExam);
doExamRouter.put("/", verifyToken_1.verifyToken, updateDoExam_1.updateDoExam);
exports.default = doExamRouter;
