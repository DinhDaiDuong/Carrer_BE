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
exports.getMajors = void 0;
const Account_1 = require("../../models/Account");
const Dictionary_1 = require("../../models/Dictionary");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const getMajors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { size = 10, page = 1, name } = _a, queries = __rest(_a, ["size", "page", "name"]);
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        // Build filter query based on user role
        const filterQueries = Object.assign(Object.assign({}, queries), (user.role === account_enum_1.ERole.TEACHER && { creatorId: req.userId }));
        // Fetch dictionary based on filter queries
        const dictionary = yield Dictionary_1.DictionaryModel.findOne(filterQueries).lean();
        if (!dictionary) {
            return res.status(404).send(Error_1.default.get("DATA_NOT_FOUND"));
        }
        let filteredMajors = dictionary === null || dictionary === void 0 ? void 0 : dictionary.majors;
        if (name) {
            filteredMajors = filteredMajors === null || filteredMajors === void 0 ? void 0 : filteredMajors.filter((major) => major.name.includes(name));
        }
        // Extract majors from the dictionary and apply pagination
        const totalMajors = filteredMajors.length;
        const paginatedMajors = filteredMajors
            .slice((page - 1) * size, page * size)
            .map((item) => (Object.assign(Object.assign({}, item), { groupId: dictionary._id })));
        return res.send({
            code: 200,
            data: paginatedMajors,
            message: "Success!",
            pagination: {
                size: +size,
                page: +page,
                totalCounts: totalMajors,
                totalPages: Math.ceil(totalMajors / +size),
            },
        });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getMajors = getMajors;
