"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GroupSchema = new mongoose_1.default.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true,
    },
    members: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "AccountModel",
        },
    ],
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AccountModel",
    },
    status: {
        type: Number,
        required: true,
    },
    exams: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "ExamModel",
        default: [],
    },
    prompts: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "ChatBotModel",
        default: [],
    },
}, { timestamps: true, collection: "Groups", versionKey: false });
const GroupModel = mongoose_1.default.model("GroupModel", GroupSchema);
exports.GroupModel = GroupModel;
