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
exports.addMajor = void 0;
const Account_1 = require("../../models/Account");
const Dictionary_1 = require("../../models/Dictionary");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const addMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId } = req.body;
        // Find the user by ID
        const user = yield Account_1.AccountModel.findById(req.userId);
        if (!user)
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        // Find the dictionary entry by group and creatorId if applicable
        const dictionary = yield Dictionary_1.DictionaryModel.findById(groupId);
        if (!dictionary) {
            return res.status(404).send(Error_1.default.get("DATA_NOT_FOUND"));
        }
        // Add the new major to the majors array
        dictionary.majors.push(Object.assign({ groupId }, req.body));
        // // Save the updated dictionary document
        yield dictionary.save();
        return res.send({
            code: 200,
            message: "Success!",
        });
    }
    catch (e) {
        console.log("e", e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addMajor = addMajor;
