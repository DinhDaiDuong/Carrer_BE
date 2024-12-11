import { Router } from "express";
import {
  addDictionary,
  addSchool,
  deleteAllSchool,
  deleteDictonary,
  deleteMajor,
  getAllSchool,
  getDictionary,
  getSchool,
  updateDictionary,
  uploadFileDictionary,
} from "../controllers/dictionary";
import { addMajor } from "../controllers/dictionary/addMajor";
import { getGroups } from "../controllers/dictionary/getGroups";
import { getMajors } from "../controllers/dictionary/getMajors";
import upload from "../middlewares/upload";
import { verifyToken } from "../middlewares/verifyToken";
const dictionaryRouter = Router();
dictionaryRouter.get("/", verifyToken, getDictionary);
dictionaryRouter.post("/addDictionary", verifyToken, addDictionary);
dictionaryRouter.put("/updateDictonary", verifyToken, updateDictionary);
dictionaryRouter.delete("/deleteDictionary", verifyToken, deleteDictonary);
dictionaryRouter.put("/deleteMajor", verifyToken, deleteMajor);
dictionaryRouter.post(
  "/uploadFileDictionary",
  verifyToken,
  upload.single("file"),
  uploadFileDictionary
);
dictionaryRouter.post(
  "/addSchool",
  verifyToken,
  upload.single("file"),
  addSchool
);
dictionaryRouter.get("/getAllSchool", verifyToken, getAllSchool);
dictionaryRouter.delete("/deleteAllSchool", verifyToken, deleteAllSchool);
dictionaryRouter.get("/getSchool", verifyToken, getSchool);
dictionaryRouter.get("/major", verifyToken, getMajors);
dictionaryRouter.post("/major", verifyToken, addMajor);

dictionaryRouter.get("/groups", verifyToken, getGroups);
export default dictionaryRouter;
