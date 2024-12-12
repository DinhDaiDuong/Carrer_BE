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
exports.updateReport = void 0;
const Report_1 = require("../../models/Report");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reports } = req.body;
        if (!Array.isArray(reports) || reports.length === 0) {
            return res.status(400).send(Error_1.default.get("EMPTY_DATA"));
        }
        // Process updates for each report asynchronously
        yield Promise.all(reports === null || reports === void 0 ? void 0 : reports.map((report) => __awaiter(void 0, void 0, void 0, function* () {
            const { type, score } = report;
            if (!!type) {
                yield Report_1.ReportModel.findOneAndUpdate({ type, score }, { $inc: { count: 1 } }, { upsert: true, new: true, setDefaultsOnInsert: true });
            }
        })));
        return res.send({
            code: 200,
            message: "Success!",
        });
    }
    catch (error) {
        console.log(error);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.updateReport = updateReport;
