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
exports.createAccountWithToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendVerifyEmail_1 = require("../../hooks/sendVerifyEmail");
const Account_1 = require("../../models/Account");
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const createAccountWithToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data.email)
            return res.status(400).send(Error_1.default.get("EMPTY_EMAIL"));
        const isExisEmail = yield Account_1.AccountModel.findOne({
            email: data.email,
        });
        const isExistUserName = yield Account_1.AccountModel.findOne({
            username: data.username,
        });
        // Fetch creator and validate account existence
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!creator)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        if (!isExisEmail && !isExistUserName) {
            if (data.password) {
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                // Verify and link existing group IDs
                const groups = Array.isArray(data.groups)
                    ? (yield Group_1.GroupModel.find({ _id: { $in: data.groups } })).map((group) => group._id)
                    : [];
                console.log(Object.assign(Object.assign({}, data), { groups, status: 0, password: hashedPassword }));
                const newAccount = new Account_1.AccountModel(Object.assign(Object.assign({}, data), { groups, status: 0, password: hashedPassword, creatorId: creator === null || creator === void 0 ? void 0 : creator.id, creator: creator === null || creator === void 0 ? void 0 : creator.email }));
                yield newAccount.save();
                if (data.email)
                    yield (0, sendVerifyEmail_1.sendVerifyEmail)([data.email], newAccount.id, newAccount.name);
                return res.send({ code: 200 });
            }
        }
        if (isExisEmail)
            return res.status(400).send(Error_1.default.get("DUPLICATE_EMAIL"));
        if (isExistUserName)
            return res.status(400).send(Error_1.default.get("DUPLICATE_USER_NAME"));
    }
    catch (e) {
        console.log(e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.createAccountWithToken = createAccountWithToken;
