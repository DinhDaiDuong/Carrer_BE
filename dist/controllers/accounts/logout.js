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
exports.logout = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../../hooks/generateToken");
const getTokenFromHeader_1 = require("../../hooks/getTokenFromHeader");
const Blacklist_1 = require("../../models/Blacklist");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key, deviceId } = req.body;
    const token = (0, getTokenFromHeader_1.getTokenFromHeader)(req);
    if (!token)
        return res.status(401).send(Error_1.default.get("INVALID_TOKEN"));
    const decoded = jsonwebtoken_1.default.decode(token);
    const newBlacklist = new Blacklist_1.BlackListModel(Object.assign(Object.assign({}, decoded), { token }));
    yield newBlacklist.save();
    if (key === "25012003") {
        const token = (0, generateToken_1.generateToken)(deviceId);
        return res.status(200).send({
            code: 200,
            message: "Đăng xuất thành công",
            data: token,
        });
    }
    return res.status(200).send({
        code: 200,
        message: "Đăng xuất thành công",
        data: null,
    });
});
exports.logout = logout;
