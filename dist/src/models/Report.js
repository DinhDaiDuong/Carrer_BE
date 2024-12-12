"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReportSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["R", "I", "A", "S", "E", "C", "IQ", "EQ"],
    },
    score: {
        type: Number,
    },
    count: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: "Report",
    versionKey: false,
});
const ReportModel = mongoose_1.default.model("ReportModel", ReportSchema);
exports.ReportModel = ReportModel;
