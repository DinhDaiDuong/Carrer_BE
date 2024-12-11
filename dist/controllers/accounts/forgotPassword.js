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
exports.forgotPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendVerifyEmail_1 = require("../../hooks/sendVerifyEmail");
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, newPassword } = req.body;
    const account = yield Account_1.AccountModel.findOne({
        username,
    });
    // Check if account exists
    if (!account) {
        return res.status(401).json(Error_1.default.get("ACCOUNT_INVALID"));
    }
    // Ensure account.password is defined before calling bcrypt.compare
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield (0, sendVerifyEmail_1.sendVerifyChangePassword)([account.email], account.id, hashedPassword);
    return res.status(200).json(Error_1.default.get("FORGOT_PASSWORD_SUCCESS"));
});
exports.forgotPassword = forgotPassword;
