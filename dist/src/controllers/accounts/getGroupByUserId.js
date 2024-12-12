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
exports.getGroupByUserId = void 0;
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getGroupByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const id = userId || req.userId;
        console.log("id", userId);
        const account = yield Account_1.AccountModel.findById(id)
            .select("-password")
            .populate({
            path: "groups",
            select: "_id owner groupName", // Select necessary fields from GroupModel
            populate: {
                path: "owner", // Populate the owner field in GroupModel
                select: "name", // Select the 'name' field from the referenced owner
            },
        });
        // Extract the group IDs as strings
        // console.log(account);
        console.log("okkk >>>>", account === null || account === void 0 ? void 0 : account.groups);
        return res.send({
            code: 200,
            data: account === null || account === void 0 ? void 0 : account.groups,
        });
    }
    catch (error) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getGroupByUserId = getGroupByUserId;
