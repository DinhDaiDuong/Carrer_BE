import { Router } from "express";
import { generateChat } from "../controllers/geminiAI/generateChat";
import { verifyToken } from "../middlewares/verifyToken";
const geminiRouter = Router();
geminiRouter.post("/generateChat", verifyToken, generateChat);
export default geminiRouter;
