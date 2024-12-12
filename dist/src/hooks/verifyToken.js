"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => {
    try {
        // Replace 'your_secret_key' with the actual secret or public key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "25012003");
        return decoded; // Returns the decoded token payload
    }
    catch (err) {
        // Handle token verification errors, e.g., token expired or invalid
        console.error("Invalid token", err);
        return null;
    }
};
exports.verifyToken = verifyToken;
