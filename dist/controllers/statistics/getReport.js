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
exports.getReport = void 0;
const Account_1 = require("../../models/Account");
const Report_1 = require("../../models/Report");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const account_enum_1 = require("../../utils/enums/account.enum");
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Account_1.AccountModel.findById(req.userId);
        if ((user === null || user === void 0 ? void 0 : user.role) !== account_enum_1.ERole.ADMIN) {
            return res.send(Error_1.default.get("PERMISSION_DENIED"));
        }
        const report = yield Report_1.ReportModel.find({}).select("-createdAt -updatedAt");
        return res.send({
            code: 200,
            data: report,
        });
    }
    catch (error) {
        console.log(error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getReport = getReport;
