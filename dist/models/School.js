"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SchoolSchema = new mongoose_1.default.Schema({
    group: {
        type: String,
        required: true,
        enum: ["A0", "A1", "B", "C", "D1", "D7"],
    },
    schoolList: [
        {
            area: {
                type: String,
                required: true,
            },
            schools: {
                type: String,
                required: true,
            },
        },
    ],
}, { collection: "School", versionKey: false });
const SchoolModel = mongoose_1.default.model("School", SchoolSchema);
exports.SchoolModel = SchoolModel;
