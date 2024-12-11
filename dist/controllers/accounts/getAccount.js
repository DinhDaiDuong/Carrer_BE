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
exports.getAccount = void 0;
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userId } = req.query;
        const id = userId || req.userId;
        const account = yield Account_1.AccountModel.findById(id)
            .select("-password")
            .populate("groups", "_id");
        // Extract the group IDs as strings
        const groupIds = account === null || account === void 0 ? void 0 : account.groups.map((group) => group._id.toString());
        // Filter and transform the permissions
        const transformedPermissions = (_b = (_a = account === null || account === void 0 ? void 0 : account.permissions) === null || _a === void 0 ? void 0 : _a.filter((permission) => {
            const { create, edit, delete: del, view } = permission.permission;
            return create || edit || del || view; // Keep only if at least one is true
        })) === null || _b === void 0 ? void 0 : _b.map((permission) => ({
            code: permission.code,
            name: permission.name,
            permission: {
                create: permission.permission.create,
                edit: permission.permission.edit,
                delete: permission.permission.delete,
                view: permission.permission.view,
            },
        }));
        return res.send({
            code: 200,
            data: Object.assign(Object.assign({}, account === null || account === void 0 ? void 0 : account.toObject()), { groups: groupIds, permissions: userId
                    ? account === null || account === void 0 ? void 0 : account.toObject().permissions
                    : transformedPermissions || [] }),
        });
    }
    catch (error) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getAccount = getAccount;
