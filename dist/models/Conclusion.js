"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConclusionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConclusionSchema = new mongoose_1.default.Schema({
    Type: {
        type: String,
        required: false,
    },
    Holland: {
        type: String,
        enum: ["R", "I", "A", "S", "E", "C"],
    },
    SchoolScore: {
        type: String,
        enum: ["A", "B", "C", "D"],
    },
    IQ: {
        type: String,
        required: true,
    },
    EQ: {
        type: String,
        required: true,
    },
    Field: {
        type: String,
        required: true,
    },
    Jobs: {
        type: String,
        required: true,
    },
    Conclusion: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    updator: {
        type: String,
        required: true,
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
}, { timestamps: true, collection: "Conclusion", versionKey: false });
const ConclusionModel = mongoose_1.default.model("ConclusionModel", ConclusionSchema);
exports.ConclusionModel = ConclusionModel;
