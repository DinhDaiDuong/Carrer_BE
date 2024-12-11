"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenFromHeader_1 = require("../hooks/getTokenFromHeader");
const Blacklist_1 = require("../models/Blacklist");
const Error_1 = __importDefault(require("../utils/constant/Error"));
// Middleware to check token validity
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecretKey = "25012003";
    const token = (0, getTokenFromHeader_1.getTokenFromHeader)(req);
    // if (token === null) {
    //   next();
    // }
    if (!token)
        return res.status(401).send(Error_1.default.get("INVALID_TOKEN"));
    const blacklist = yield Blacklist_1.BlackListModel.findOne({ token: token });
    if (blacklist)
        return res.status(401).send(Error_1.default.get("INVALID_TOKEN"));
    try {
        const verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        console.log("okk", verified === null || verified === void 0 ? void 0 : verified.userId);
        if (verified === null || verified === void 0 ? void 0 : verified.userId) {
            req.userId = verified === null || verified === void 0 ? void 0 : verified.userId;
        }
        next();
    }
    catch (err) {
        yield Blacklist_1.BlackListModel.deleteOne({ token: token });
        res.status(401).send(Error_1.default.get("INVALID_TOKEN"));
    }
});
exports.verifyToken = verifyToken;
