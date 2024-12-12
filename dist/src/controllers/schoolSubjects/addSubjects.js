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
exports.addSubjects = void 0;
const Subjects_1 = require("../../models/Subjects");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const Account_1 = require("../../models/Account");
const addSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjects } = req.body;
        const creator = yield Account_1.AccountModel.findById(req.userId);
        if (!!(creator === null || creator === void 0 ? void 0 : creator.email)) {
            const newSubjects = subjects === null || subjects === void 0 ? void 0 : subjects.map((subject) => (Object.assign(Object.assign({}, subject), { creatorId: creator === null || creator === void 0 ? void 0 : creator.id, creator: creator === null || creator === void 0 ? void 0 : creator.email, updator: creator === null || creator === void 0 ? void 0 : creator.email })));
            yield Subjects_1.SubjectsModel.insertMany([...newSubjects]).then((savedSubjects) => {
                return res.send({
                    code: 200,
                    data: savedSubjects,
                });
            });
        }
        else {
            return res.send(Error_1.default.get("ACCOUNT_INVALID"));
        }
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addSubjects = addSubjects;
