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
exports.getListAccounts = void 0;
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const getListAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, name, role = "", status, direction = -1, page = 1, size = 10, } = req.query;
        let query = {};
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (((_a = creator === null || creator === void 0 ? void 0 : creator.toObject()) === null || _a === void 0 ? void 0 : _a.role) !== account_enum_1.ERole.ADMIN) {
            query.creatorId = creator === null || creator === void 0 ? void 0 : creator.id;
        }
        if (email && name) {
            const emailPattern = new RegExp(email, "i");
            const namePattern = new RegExp(name, "i");
            query["$or"] = [{ email: emailPattern }, { name: namePattern }];
        }
        else {
            if (email) {
                const emailPattern = new RegExp(email, "i");
                query["$or"] = [{ email: emailPattern }];
            }
            if (name) {
                const namePattern = new RegExp(name, "i");
                query["$or"] = [{ name: namePattern }];
            }
        }
        if (status !== undefined) {
            query.status = status; // Add status to the query if provided
        }
        else {
            query["$or"] = [{ status: 0 }, { status: 1 }];
        }
        if (role) {
            const accounts = yield Account_1.AccountModel.find(query)
                .where({
                role: role || "",
                status: 0 || 1,
            })
                .populate("groups", "_id groupName")
                .select("-password")
                .sort({ updatedAt: direction === 1 ? 1 : -1 })
                .skip((page - 1) * size)
                .limit(size)
                .exec();
            const countAccounts = yield Account_1.AccountModel.countDocuments(query);
            return res.send({
                code: 200,
                data: accounts,
                pagination: {
                    size: +size,
                    page: +page,
                    totalCounts: countAccounts,
                    totalPages: Math.ceil(countAccounts / +size),
                },
            });
        }
        else {
            const accounts = yield Account_1.AccountModel.find(query)
                .select("-password")
                .populate("groups", "_id groupName")
                .sort({ updatedAt: direction === 1 ? 1 : -1 })
                .skip((page - 1) * size)
                .limit(size)
                .exec();
            const countAccounts = yield Account_1.AccountModel.countDocuments(query);
            return res.send({
                code: 200,
                data: accounts,
                pagination: {
                    size: +size,
                    page: +page,
                    totalCounts: countAccounts,
                    totalPages: Math.ceil(countAccounts / +size),
                },
            });
        }
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getListAccounts = getListAccounts;
