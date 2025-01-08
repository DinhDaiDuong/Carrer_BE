import { Response } from "express";
import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";

export const addExamToGroup = async (
  req: TRequest<{ groupId: string; examId: string }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { groupId, examId } = req.body;

    // Check if the exam exists
    const examExists = await ExamModel.findById(examId);
    if (!examExists) {
      return res.status(404).send(ErrorUtils.get("EXAM_NOT_FOUND"));
    }

    // Check if the group exists
    const groupExists = await GroupModel.findById(groupId);
    if (!groupExists) {
      return res.status(404).send(ErrorUtils.get("GROUP_NOT_FOUND"));
    }

    // Add groupId to the exam's groups array (if applicable)
    await ExamModel.findByIdAndUpdate(
      examId,
      { $addToSet: { groupId: groupId } }, // Ensure the schema has `groups` as an array
      { new: true }
    );

    // Add examId to the group’s exams array
    await GroupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { exams: examId } },
      { new: true }
    );

    return res.status(200).send({
      code: 200,
      message: "Exam successfully added to the group!",
    });
  } catch (error) {
    console.error("Error adding exam to group:", error);
    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
