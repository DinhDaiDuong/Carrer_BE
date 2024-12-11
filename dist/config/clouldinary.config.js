"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfigs = void 0;
const cloudinary_1 = require("cloudinary");
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
exports.cloudinaryConfigs = cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});
