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
exports.getListMemberAccount = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Account_1 = require("../../models/Account");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getListMemberAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const accounts = yield Account_1.AccountModel.find({
            creatorId: userId,
        })
            .select("-password")
            .populate("groups", "_id groupName");
        console.log(accounts);
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        console.log(accounts, userObjectId);
        const membersInGroup = yield Group_1.GroupModel.find({
            owner: userObjectId,
        }).populate({
            path: "members",
            select: "-password", // Select members without password
            populate: {
                path: "groups", // Populate groups inside each member
                select: "_id groupName", // Select only group _id and groupName
            },
        });
        // Merge the accounts and members
        const mergedMembers = [
            ...accounts,
            ...membersInGroup.flatMap((group) => group.members),
        ];
        // Remove duplicates by _id using filter and a seenIds set
        const seenIds = new Set();
        const uniqueMembers = mergedMembers.filter((member) => {
            //@ts-ignore no check
            const id = member.id; // Convert _id to string for comparison
            if (seenIds.has(id)) {
                return false; // Skip if already seen
            }
            seenIds.add(id); // Add the _id to seenIds set
            return true; // Include this member in the result
        });
        // Return the unique members in the response
        return res.send({
            code: 200,
            data: uniqueMembers, // Return the unique members here
        });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getListMemberAccount = getListMemberAccount;
