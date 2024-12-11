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
exports.deleteAccount = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Account_1 = require("../../models/Account");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email } = req.query;
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (id && !mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).send(Error_1.default.get("EMPTY_DATA"));
        }
        // Attempt to delete the account by ID
        if (id) {
            const deletedAccount = yield Account_1.AccountModel.findByIdAndDelete(id);
            if (!deletedAccount) {
                return res.status(404).send(Error_1.default.get("EMPTY_DATA"));
            }
            return res.send({ code: 200, message: "Account successfully deleted" });
        }
        else if (email) {
            const deletedAccount = yield Account_1.AccountModel.findOneAndDelete({
                email,
            });
            if (!deletedAccount) {
                return res.status(404).send(Error_1.default.get("EMPTY_DATA"));
            }
            return res.send({ code: 200, message: "Account successfully deleted" });
        }
        else
            return res.status(404).send(Error_1.default.get("EMPTY_DATA"));
    }
    catch (error) {
        return res.status(500).send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.deleteAccount = deleteAccount;
