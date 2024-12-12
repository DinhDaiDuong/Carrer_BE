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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewDictionary = void 0;
const Dictionary_1 = require("../../../models/Dictionary");
const addNewDictionary = (group, majors, creator) => __awaiter(void 0, void 0, void 0, function* () {
    const existedGroup = yield Dictionary_1.DictionaryModel.findOne({ group });
    console.log("creator", creator);
    if (existedGroup) {
        const updatedGroup = yield Dictionary_1.DictionaryModel.findOneAndUpdate({ group: group }, { $addToSet: { majors: { $each: majors } } }, { new: true });
        return updatedGroup;
    }
    else {
        const newGroup = new Dictionary_1.DictionaryModel({
            group,
            majors,
            creator: creator === null || creator === void 0 ? void 0 : creator.email,
            updator: creator === null || creator === void 0 ? void 0 : creator.email,
            creatorId: creator === null || creator === void 0 ? void 0 : creator.id,
        });
        const savedGroup = yield newGroup.save();
        return savedGroup;
    }
});
exports.addNewDictionary = addNewDictionary;
