"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EExamCategory = exports.EExamStatus = exports.EQuestionType = void 0;
var EQuestionType;
(function (EQuestionType) {
    EQuestionType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    EQuestionType["TICK_BOX"] = "TICK_BOX";
    EQuestionType["SHORT_ANSWER"] = "SHORT_ANSWER";
    EQuestionType["COMBINE"] = "COMBINE";
})(EQuestionType || (exports.EQuestionType = EQuestionType = {}));
var EExamStatus;
(function (EExamStatus) {
    EExamStatus["UNACTIVATED"] = "UNACTIVATED";
    EExamStatus["ACTIVE"] = "ACTIVE";
    EExamStatus["BLOCKED"] = "BLOCKED";
})(EExamStatus || (exports.EExamStatus = EExamStatus = {}));
var EExamCategory;
(function (EExamCategory) {
    EExamCategory["SYSTEM"] = "SYSTEM";
    EExamCategory["DESIGN"] = "DESIGN";
})(EExamCategory || (exports.EExamCategory = EExamCategory = {}));
