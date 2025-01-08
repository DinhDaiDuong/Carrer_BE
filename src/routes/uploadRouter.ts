import { Router } from "express";
import { upload } from "../controllers/uploads/upload";
import { uploadImages } from "../middlewares/upload";
import { verifyToken } from "../middlewares/verifyToken";
const uploadRouter = Router();
uploadRouter.post("/", verifyToken, uploadImages.single("file"), upload);
export default uploadRouter;
