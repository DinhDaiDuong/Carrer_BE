"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeader = void 0;
const getTokenFromHeader = (req) => {
    const authHeader = req.headers["authorization"]; // Get the Authorization header
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1]; // Extract token part
    }
    return null; // No token found
};
exports.getTokenFromHeader = getTokenFromHeader;
