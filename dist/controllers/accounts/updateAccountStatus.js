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
exports.updateStatusAccount = void 0;
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const updateStatusAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { status } = req.body;
        yield Account_1.AccountModel.findByIdAndUpdate(id, {
            status: status,
        }).then((value) => {
            return res.send({ code: 200 });
        });
    }
    catch (error) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.updateStatusAccount = updateStatusAccount;