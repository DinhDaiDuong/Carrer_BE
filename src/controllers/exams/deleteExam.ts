import { v2 as cloudinary } from "cloudinary";
import { Response } from "express";
import { ObjectId } from "mongoose";
import { ExamModel } from "../../models/Exam";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest } from "../../utils/types/meta";

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});
export const deleteExam = async (
  req: TRequest<any, { id: ObjectId }>,
  res: Response
) => {
  try {
    const { id } = req.query;

    const exam = await ExamModel.findById(id);
    if (!exam) {
      return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));
    }

    // HANDLE DELETE IMAGES ON CLOUDINARY
    const { questions, results } = exam;
    const questionPromises = questions?.map(async (question) => {
      if (question?.imageKey && question?.image) {
        await cloudinary.uploader.destroy(question.imageKey);
      }
      const optionPromises = question?.options?.map(async (option) => {
        if (option?.imageKey && option?.image) {
          await cloudinary.uploader.destroy(option?.imageKey);
        }
      });
      await Promise.all(optionPromises || []);
    });
    await Promise.all(questionPromises);

    const resultPromises = results?.map(async (item) => {
      if (item?.imageKey && item?.image) {
        await cloudinary.uploader.destroy(item.imageKey);
      }
    });
    await Promise.all(resultPromises);

    // Corrected deleteOne query to pass the id directly
    const deletedExam = await ExamModel.deleteOne({ _id: id });

    if (deletedExam.deletedCount === 0) {
      return res.send(ErrorUtils.get("EXAM_ID_DELETE_NOT_FOUND")!);
    }

    // HANDLE FOREIGN KEYS

    // Pull the exam id from all groups that have it
    await GroupModel.updateMany({ exams: id }, { $pull: { exams: id } });

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
