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
exports.deleteBlacklist = void 0;
const Blacklist_1 = require("../../models/Blacklist");
const deleteBlacklist = () => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all entries from the Blacklist collection
    yield Blacklist_1.BlackListModel.deleteMany({});
});
exports.deleteBlacklist = deleteBlacklist;
