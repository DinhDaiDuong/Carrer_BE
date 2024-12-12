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
exports.addDictionary = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const addNewDictionary_1 = require("./utils/addNewDictionary");
const Account_1 = require("../../models/Account");
const addDictionary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { group, majors } = req.body;
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!!creator) {
            yield (0, addNewDictionary_1.addNewDictionary)(group, majors, creator).then((savedGroup) => {
                console.log("saved", savedGroup);
                return res.send({ code: 200, data: savedGroup, message: "Success" });
            });
        }
        else {
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        }
    }
    catch (e) {
        console.log("e", e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addDictionary = addDictionary;
