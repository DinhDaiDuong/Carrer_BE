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
exports.getListAccountMember = void 0;
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getListAccountMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword = "" } = req.query;
        const accounts = yield Account_1.AccountModel.find({
            $and: [
                { status: 1, $or: [{ role: "STUDENT" }, { role: "TEACHER" }] },
                {
                    $or: [
                        { username: { $regex: keyword || "", $options: "i" } },
                        { name: { $regex: keyword || "", $options: "i" } },
                    ],
                },
            ],
        }).select(["name", "_id", "email", "role"]);
        return res.send({
            code: 200,
            //@ts-expect-error no check
            data: accounts,
            message: "",
        });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getListAccountMember = getListAccountMember;
