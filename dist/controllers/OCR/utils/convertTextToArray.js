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
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTextToArray = void 0;
const Subjects_1 = require("../../../models/Subjects");
const convertTextToArray = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const lines = text.split("\n");
    const results = new Map();
    const subjectsWithValue = [];
    for (const line of lines) {
        //subjects.push(line?.trim());
        const [subject, score] = line.split(":").map((item) => item.trim());
        subjectsWithValue.push({
            vnName: subject,
            value: score,
        });
    }
    const subjects = yield Subjects_1.SubjectsModel.find({});
    if (subjects) {
        subjects === null || subjects === void 0 ? void 0 : subjects.map((subject, index) => {
            //console.log("subject", subject);
            const existSubject = subjectsWithValue === null || subjectsWithValue === void 0 ? void 0 : subjectsWithValue.find((item) => item.vnName === subject.vnName);
            results.set(subject.name, {
                _id: subject === null || subject === void 0 ? void 0 : subject._id,
                name: subject === null || subject === void 0 ? void 0 : subject.name,
                vnName: subject === null || subject === void 0 ? void 0 : subject.vnName,
                value: existSubject ? existSubject === null || existSubject === void 0 ? void 0 : existSubject.value : "",
            });
        });
    }
    return Object.fromEntries(results);
});
exports.convertTextToArray = convertTextToArray;
