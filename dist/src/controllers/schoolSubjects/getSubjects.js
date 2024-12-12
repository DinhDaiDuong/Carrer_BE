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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjects = void 0;
const Subjects_1 = require("../../models/Subjects");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const Account_1 = require("../../models/Account");
const account_enum_1 = require("../../utils/enums/account.enum");
const mongoose_1 = require("mongoose");
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { size = 10, page = 1, direction = -1, vnName, name } = _a, queries = __rest(_a, ["size", "page", "direction", "vnName", "name"]);
        // TEMPORARY
        if (!mongoose_1.Types.ObjectId.isValid(req.userId)) {
            const subjects = yield Subjects_1.SubjectsModel.find({});
            return res.send({
                code: 200,
                data: subjects,
                message: "Success!",
                pagination: {
                    size: 10,
                    page: 1,
                    totalCounts: 6,
                    totalPages: 1,
                },
            });
        }
        ///
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        const filterQueries = Object.assign(Object.assign(Object.assign(Object.assign({}, queries), (user.role !== account_enum_1.ERole.ADMIN &&
            user.role !== account_enum_1.ERole.ANONYMOUS && { creatorId: req.userId })), (vnName && { vnName: { $regex: vnName, $options: "i" } })), (name && { name: { $regex: name, $options: "i" } }));
        const subjects = yield Subjects_1.SubjectsModel.find(filterQueries)
            .sort({
            createdAt: direction === 1 ? 1 : -1,
        })
            .skip((+page - 1) * +size)
            .limit(size)
            .exec();
        const totalCounts = yield Subjects_1.SubjectsModel.countDocuments(filterQueries);
        return res.send({
            code: 200,
            data: subjects,
            message: "Success",
            pagination: {
                size: +size,
                page: +page,
                totalCounts: totalCounts || 0,
                totalPages: Math.ceil(totalCounts / size),
            },
        });
    }
    catch (e) {
        console.log(e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getSubjects = getSubjects;
