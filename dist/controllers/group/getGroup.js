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
exports.getGroup = void 0;
const Group_1 = require("../../models/Group");
const Error_1 = __importDefault(require("../../utils/constant/Error"));
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const group = yield Group_1.GroupModel.findById(id)
            .populate("exams", "_id type name category status")
            .populate("owner", "_id name email status")
            .populate("members", "_id name email status");
        return res.status(200).send({
            code: 200,
            data: group,
            // data: {
            //   ...group,
            //   exam: group?.exams?.filter(
            //     (item) => item?.status !== EExamStatus.ACTIVE
            //   ),
            // },
        });
    }
    catch (error) {
        return res.send(Error_1.default.get("SERVER_ERROR"));
    }
});
exports.getGroup = getGroup;
