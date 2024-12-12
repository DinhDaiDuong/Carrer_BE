"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NewsSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["BREAKING", "NORMAL"],
        default: "NORMAL",
    },
    image: {
        longImage: String,
        shortImage: {
            type: String,
            required: true,
        },
    },
}, { collection: "News", versionKey: false });
const NewsModel = mongoose_1.default.model("NewsModel", NewsSchema);
exports.NewsModel = NewsModel;
