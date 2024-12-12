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
exports.createGroup = void 0;
const Account_1 = require("../../models/Account");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log("create group", data);
    // Validate input data
    if (!data.groupName ||
        !data.owner ||
        !data.members ||
        data.members.length === 0) {
        return res.status(400).send(Error_1.default.get("ERROR_INVALID"));
    }
    // Validate the owner
    const isValidOwner = yield Account_1.AccountModel.findById(data.owner);
    if (!isValidOwner) {
        return res.status(400).send(Error_1.default.get("ACCOUNT_INVALID"));
    }
    if (isValidOwner.role === "STUDENT" || isValidOwner.role === "ANONYMOUS") {
        return res.status(400).send(Error_1.default.get("INVALID_PERMISSION"));
    }
    // Validate the members
    const validUsers = yield Account_1.AccountModel.find({
        _id: {
            $in: data.members,
        },
    });
    if (validUsers.length !== data.members.length) {
        return res.status(400).send(Error_1.default.get("ACCOUNT_INVALID"));
    }
    // Create the new group
    const newGroup = new Group_1.GroupModel(Object.assign(Object.assign({}, data), { status: 1 }));
    yield newGroup.save();
    // Add the group to the owner's groups
    yield Account_1.AccountModel.findByIdAndUpdate(data.owner, {
        $push: { groups: newGroup._id },
    });
    // Optionally, add the group to the members' groups
    yield Account_1.AccountModel.updateMany({ _id: { $in: data.members } }, { $push: { groups: newGroup._id } });
    res.status(201).send({ code: 200, groupId: newGroup._id });
});
exports.createGroup = createGroup;
