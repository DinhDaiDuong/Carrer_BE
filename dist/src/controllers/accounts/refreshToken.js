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
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../../hooks/generateToken");
const getTokenFromHeader_1 = require("../../hooks/getTokenFromHeader");
const Blacklist_1 = require("../../models/Blacklist");
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtSecretKey = "25012003";
        const token = (0, getTokenFromHeader_1.getTokenFromHeader)(req);
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecretKey, {
                ignoreExpiration: true,
            });
            const newBlacklist = new Blacklist_1.BlackListModel(Object.assign(Object.assign({}, decoded), { token }));
            yield newBlacklist.save();
            const newToken = (0, generateToken_1.generateToken)(decoded.userId);
            res.status(200).json({
                message: "Refresh success",
                data: newToken,
            });
        }
    }
    catch (_a) {
        res.status(401).json({
            message: "Token hết hạn",
            data: {},
        });
    }
});
exports.refreshToken = refreshToken;
