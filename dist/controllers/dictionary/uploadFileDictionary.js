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
exports.uploadFileDictionary = void 0;
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const Dictionary_1 = require("../../utils/interfaces/Dictionary");
const lodash_1 = __importDefault(require("lodash"));
const addNewDictionary_1 = require("./utils/addNewDictionary");
const Dictionary_2 = require("../../models/Dictionary");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
const uploadFileDictionary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { isReplaceAll = true } = req.query;
        const dictionary = yield (0, csvtojson_1.default)().fromFile((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const validateDictionary = dictionary === null || dictionary === void 0 ? void 0 : dictionary.filter((item) => Object.values(Dictionary_1.EGroup).includes(item.group));
        const groupedDictionary = lodash_1.default.groupBy(validateDictionary, "group");
        if (JSON.parse(isReplaceAll)) {
            yield Dictionary_2.DictionaryModel.deleteMany({});
        }
        const results = [];
        const savedDictionary = Object.keys(groupedDictionary).map((group) => __awaiter(void 0, void 0, void 0, function* () {
            const majors = groupedDictionary[group].map((major) => ({
                name: major.name,
                image: major.image,
                subjects: major.subjects,
                pros: major.pros,
                cons: major.cons,
            }));
            return yield (0, addNewDictionary_1.addNewDictionary)(group, majors).then((result) => {
                results.push(result);
            });
        }));
        const directoryPath = path_1.default.join(__dirname, "../../../public/uploads");
        const files = yield fs_extra_1.promises.readdir(directoryPath);
        for (const file of files) {
            const filePath = path_1.default.join(directoryPath, file);
            yield fs_extra_1.promises.unlink(filePath);
            console.log("Successfully deleted file: ", filePath);
        }
        Promise.all(savedDictionary).then(() => {
            return res.send({ code: 200, data: results });
        });
    }
    catch (e) {
        //console.log(e);
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.uploadFileDictionary = uploadFileDictionary;
