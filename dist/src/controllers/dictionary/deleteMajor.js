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
exports.deleteMajor = void 0;
const cloudinary_1 = require("cloudinary");
const Dictionary_1 = require("../../models/Dictionary");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});
const deleteMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, groupId } = req.query;
        const groups = yield Dictionary_1.DictionaryModel.findById(groupId).lean();
        const major = (_a = groups === null || groups === void 0 ? void 0 : groups.majors) === null || _a === void 0 ? void 0 : _a.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === id.toString(); });
        if (major === null || major === void 0 ? void 0 : major.imageKey) {
            yield cloudinary_1.v2.uploader.destroy(major === null || major === void 0 ? void 0 : major.imageKey);
        }
        const updatedDictionary = yield Dictionary_1.DictionaryModel.findByIdAndUpdate(groupId, {
            $pull: { majors: { _id: id } },
        }, { new: true });
        if (!updatedDictionary) {
            return res.send(Error_1.default.get("DICTIONARY_ID_OR_ENTRY_ID_DELETE_NOT_FOUND"));
        }
        return res.send({ code: 200 });
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.deleteMajor = deleteMajor;
