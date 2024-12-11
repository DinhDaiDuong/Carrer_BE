import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { IExam } from "../../utils/interfaces/Exam";
import { TRequest } from "../../utils/types/meta";

export const addExam = async (req: TRequest<IExam>, res: Response) => {
  try {
    const {
      type,
      questions,
      results,
      name,
      category,
      status,
      groupId = [],
    } = req.body;
    const creator = await AccountModel.findById(req.userId);

    if (!!creator?.id) {
      const newExam = new ExamModel({
        type,
        questions,
        results,
        name,
        category,
        status,
        creator: creator?.email,
        updator: creator?.email,
        creatorId: creator?.id,
        groupId: groupId,
      });
      await newExam.save().then(async (savedExam) => {
        // HANDLE FOREIGN KEYS

        if (groupId.length > 0) {
          await GroupModel.updateMany(
            { _id: { $in: groupId } }, // Filter by group IDs
            { $push: { exams: savedExam._id } } // Push exam ID to exams array
          );
        }

        return res.send({
          code: 200,
          data: savedExam,
        });
      });
    } else {
      return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    }
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
