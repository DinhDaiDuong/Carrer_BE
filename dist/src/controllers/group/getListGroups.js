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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListGroups = void 0;
const Account_1 = require("../../models/Account");
const Group_1 = require("../../models/Group");
const account_enum_1 = require("../../utils/enums/account.enum");
const getListGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { groupName, status, direction = -1, page = 1, size = 10, } = req.query;
        let query = {};
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (((_a = creator === null || creator === void 0 ? void 0 : creator.toObject()) === null || _a === void 0 ? void 0 : _a.role) !== account_enum_1.ERole.ADMIN) {
            query.owner = creator === null || creator === void 0 ? void 0 : creator.id;
        }
        if (groupName) {
            const groupNamePattern = new RegExp(groupName, "i");
            query["$or"] = [{ groupName: groupNamePattern }];
        }
        if (status !== undefined) {
            query.status = +status; // Add status to the query if provided
        }
        console.log(query);
        const groups = yield Group_1.GroupModel.find(query)
            .populate("members", "_id email name status")
            .populate("owner", "_id email name status")
            .sort({ updatedAt: +direction === 1 ? 1 : -1 })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        const countGroups = yield Group_1.GroupModel.countDocuments(query);
        return res.send({
            code: 200,
            data: groups,
            pagination: {
                size: +size,
                page: +(page - 1),
                totalCounts: countGroups,
                totalPages: Math.ceil(countGroups / +size),
            },
        });
    }
    catch (error) { }
});
exports.getListGroups = getListGroups;
