import { Router } from "express";
import { createGroup } from "../controllers/group/createGroup";
import { deleteGroup } from "../controllers/group/deleteGroup";
import { getGroup } from "../controllers/group/getGroup";
import { getListGroups } from "../controllers/group/getListGroups";
import { getListGroupSelect } from "../controllers/group/getListGroupSelect";
import { updateGroup } from "../controllers/group/updateGroup";
import { verifyToken } from "../middlewares/verifyToken";

const groupRouter = Router();

groupRouter.get("/all", verifyToken, getListGroups);
groupRouter.post("/", verifyToken, createGroup);
groupRouter.get("/", verifyToken, getGroup);
groupRouter.put("/", verifyToken, updateGroup);
groupRouter.delete("/", verifyToken, deleteGroup);
groupRouter.get("/select", verifyToken, getListGroupSelect);

export default groupRouter;
