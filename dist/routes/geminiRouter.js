"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateChat_1 = require("../controllers/geminiAI/generateChat");
const verifyToken_1 = require("../middlewares/verifyToken");
const geminiRouter = (0, express_1.Router)();
geminiRouter.post("/generateChat", verifyToken_1.verifyToken, generateChat_1.generateChat);
exports.default = geminiRouter;
