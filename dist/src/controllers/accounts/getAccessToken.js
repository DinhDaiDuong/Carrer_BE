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
exports.getAccessToken = void 0;
const generateToken_1 = require("../../hooks/generateToken");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key, deviceId } = req.query;
        if (key === "25012003") {
            const token = (0, generateToken_1.generateToken)(deviceId);
            return res.status(200).send({
                code: 200,
                message: "Đăng nhập thành công",
                data: {
                    token: token,
                },
            });
        }
        return res.status(400).send(Error_1.default.get("INVALID_TOKEN"));
    }
    catch (error) {
        return res.status(400).send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getAccessToken = getAccessToken;
