"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DictionarySchema = new mongoose_1.default.Schema({
    group: {
        type: String,
        required: true,
        enum: ["A0", "A1", "B", "C", "D1", "D7"],
    },
    majors: [
        {
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            imageKey: {
                type: String,
            },
            subjects: {
                type: String,
                required: true,
            },
            pros: {
                type: String,
                required: true,
            },
            cons: {
                type: String,
                required: true,
            },
            creator: {
                type: String,
                required: false,
            },
            updator: {
                type: String,
            },
            // FOREIGN KEY
            creatorId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "AccountModel",
            },
            groupId: {
                type: [mongoose_1.default.Schema.Types.ObjectId],
                ref: "GroupModel",
            },
        },
    ],
}, { timestamps: true, collection: "Dictionary", versionKey: false });
const DictionaryModel = mongoose_1.default.model("Dictionary", DictionarySchema);
exports.DictionaryModel = DictionaryModel;
