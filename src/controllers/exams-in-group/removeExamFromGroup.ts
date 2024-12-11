import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";

export const removeExamFromGroup = async (
  req: TRequest<{ groupId: number; examId: number }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { groupId, examId } = req.body;

    // Check if the exam exists
    const updatedExam = await ExamModel.findByIdAndUpdate(
      examId,
      { $pull: { groupId: groupId } }, // $addToSet ensures the same examId is not added twice
      { new: true }
    );
    if (!updatedExam) {
      return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
    }

    // Find the group and remove the examId from the exams array
    const updatedGroup = await GroupModel.findByIdAndUpdate(
      groupId,
      { $pull: { exams: examId } }, // $pull removes the examId from the exams array
      { new: true }
    );
    if (!updatedGroup) {
      return res.send(ErrorUtils.get("GROUP_NOT_FOUND"));
    }

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.log("error", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
