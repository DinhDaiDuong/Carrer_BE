"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConclusion = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const Conclusion_1 = require("../../models/Conclusion");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
const uploadConclusion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { isReplaceAll = true } = req.query;
        const conclusions = yield (0, csvtojson_1.default)().fromFile((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const validateConclusions = conclusions === null || conclusions === void 0 ? void 0 : conclusions.filter((conclusion) => conclusion.Type !== "");
        if (JSON.parse(isReplaceAll)) {
            yield Conclusion_1.ConclusionModel.deleteMany({});
        }
        yield Conclusion_1.ConclusionModel.insertMany(validateConclusions).then(() => __awaiter(void 0, void 0, void 0, function* () {
            // Delete file in vscode after add in mongodb
            const directoryPath = path_1.default.join(__dirname, "../../../public/uploads");
            const files = yield fs_extra_1.promises.readdir(directoryPath);
            for (const file of files) {
                const filePath = path_1.default.join(directoryPath, file);
                yield fs_extra_1.promises.unlink(filePath);
                console.log("Successfully deleted file: ", filePath);
            }
            ///////////////
            return res.send({
                code: 200,
                data: validateConclusions,
            });
        }));
    }
    catch (e) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.uploadConclusion = uploadConclusion;
