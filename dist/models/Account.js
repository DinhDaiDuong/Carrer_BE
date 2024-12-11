"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Enum for roles
const roles = {
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
    ANONYMOUS: "ANONYMOUS",
};
const FeatureDetailSchema = new mongoose_1.default.Schema({
    create: { type: Boolean, required: true },
    edit: { type: Boolean, required: true },
    delete: { type: Boolean, required: true },
    view: { type: Boolean, required: true },
}, { timestamps: true, collection: "Feature", versionKey: false });
const PermissionSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    permission: FeatureDetailSchema,
}, { timestamps: true, collection: "Permission", versionKey: false });
const AccountSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Địa chỉ email không chính xác"],
        lowercase: true,
    },
    groups: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "GroupModel", // References the Group model
        },
    ],
    accessToken: {
        type: String,
        trim: true,
        required: false,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(roles), // Use the enum for validation
        trim: true,
    },
    status: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
    },
    permissions: {
        type: [PermissionSchema], // Array of permission objects
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
}, { timestamps: true, collection: "Accounts", versionKey: false });
const AccountModel = mongoose_1.default.model("AccountModel", AccountSchema);
exports.AccountModel = AccountModel;
