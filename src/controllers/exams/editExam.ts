import { v2 as cloudinary } from "cloudinary";
import { Response } from "express";
import { ObjectId } from "mongoose";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { IExam } from "../../utils/interfaces/Exam";
import { TRequest } from "../../utils/types/meta";

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});
export const editExam = async (
  req: TRequest<IExam, { id: ObjectId }>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const exam = await ExamModel.findById(id);
    if (!exam) {
      return res.send(ErrorUtils.get("SERVER_ERROR"));
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
    ///

    const updatedData = { ...exam.toObject(), ...req.body };
    await ExamModel.findByIdAndUpdate(id, updatedData, { new: true }).then(
      (result) => {
        return res.send({
          code: 200,
          data: result,
        });
      }
    );
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
