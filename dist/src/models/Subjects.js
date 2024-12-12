"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SubjectsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
    vnName: {
        type: String,
        required: true,
        default: "",
    },
    creator: {
        type: String,
        required: true,
    },
    updator: {
        type: String,
    },
    // FOREIGN KEY
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AccountModel",
    },
}, { timestamps: true, collection: "Subject", versionKey: false });
const SubjectsModel = mongoose_1.default.model("SubjectModel", SubjectsSchema);
exports.SubjectsModel = SubjectsModel;
