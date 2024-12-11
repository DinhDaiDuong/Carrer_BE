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
exports.updateDictionary = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const Dictionary_1 = require("../../models/Dictionary");
const updateDictionary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, groupId } = req.query;
        const updatedDictionary = yield Dictionary_1.DictionaryModel.findOneAndUpdate({ _id: groupId, "majors._id": id }, {
            $set: { "majors.$": Object.assign({ _id: id }, req.body) },
        }, {
            new: true,
        });
        if (!updatedDictionary) {
            return res.send(Error_1.default.get("UPDATED_DICTIONARY_NOT_FOUND"));
        }
        return res.send({
            code: 200,
            data: updatedDictionary,
        });
    }
    catch (e) {
        //console.log(e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.updateDictionary = updateDictionary;
