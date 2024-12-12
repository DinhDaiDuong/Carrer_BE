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
exports.addSchool = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const School_1 = require("../../models/School");
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { isReplaceAll = true } = req.query;
        const schools = yield (0, csvtojson_1.default)().fromFile((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const validateSchools = schools === null || schools === void 0 ? void 0 : schools.filter((item) => (item === null || item === void 0 ? void 0 : item.schools) !== "");
        const groupedSchools = lodash_1.default.groupBy(validateSchools, "group");
        if (JSON.parse(isReplaceAll)) {
            yield School_1.SchoolModel.deleteMany({});
        }
        const results = [];
        const savedSchools = Object.keys(groupedSchools).map((group) => __awaiter(void 0, void 0, void 0, function* () {
            const schoolList = groupedSchools[group].map((item) => ({
                area: item === null || item === void 0 ? void 0 : item.area,
                schools: item === null || item === void 0 ? void 0 : item.schools,
            }));
            const existedGroup = yield School_1.SchoolModel.findOne({ group: group });
            if (existedGroup) {
                yield School_1.SchoolModel.findOneAndUpdate({ group }, { $addToSet: { schoolList: { $each: schoolList } } }, { new: true }).then((updatedGroup) => {
                    results.push(updatedGroup);
                });
            }
            else {
                const newGroup = new School_1.SchoolModel({
                    group: group,
                    schoolList: schoolList,
                });
                yield newGroup.save().then((savedGroup) => {
                    results.push(savedGroup);
                });
            }
        }));
        const directoryPath = path_1.default.join(__dirname, "../../../public/uploads");
        const files = yield fs_extra_1.promises.readdir(directoryPath);
        for (const file of files) {
            const filePath = path_1.default.join(directoryPath, file);
            yield fs_extra_1.promises.unlink(filePath);
            //console.log("Successfully deleted file: ", filePath);
        }
        Promise.all(savedSchools).then(() => {
            return res.send({
                code: 200,
                data: results,
            });
        });
    }
    catch (e) {
        //console.log(e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.addSchool = addSchool;
