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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../../hooks/generateToken");
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, deviceId } = req.body;
    const account = yield Account_1.AccountModel.findOne({
        username,
    });
    // Check if account exists
    if (!account) {
        return res.status(401).json(Error_1.default.get("INVALID_USERNAME_PASSWORD"));
    }
    // Ensure account.password is defined before calling bcrypt.compare
    const isPasswordValid = account.password && (yield bcrypt_1.default.compare(password, account.password));
    if (isPasswordValid) {
        if (account.status === 1) {
            const token = (0, generateToken_1.generateToken)(account.id);
            return res.status(200).send({
                code: 200,
                message: "Đăng nhập thành công",
                data: {
                    id: account.id,
                    name: account.name,
                    role: account.role,
                    email: account.email,
                    groups: account.groups,
                    permissions: account.permissions,
                    accessToken: token !== null && token !== void 0 ? token : "",
                },
            });
        }
        else {
            return res.status(401).json(Error_1.default.get("UNVERIFY_EMAIL"));
        }
    }
    else {
        return res.status(401).json(Error_1.default.get("INVALID_USERNAME_PASSWORD"));
    }
});
exports.login = login;
