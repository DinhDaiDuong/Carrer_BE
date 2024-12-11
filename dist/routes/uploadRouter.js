"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/uploads/upload");
const upload_2 = require("../middlewares/upload");
const verifyToken_1 = require("../middlewares/verifyToken");
const uploadRouter = (0, express_1.Router)();
uploadRouter.post("/", verifyToken_1.verifyToken, upload_2.uploadImages.single("file"), upload_1.upload);
exports.default = uploadRouter;
