import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils from "../../utils/constant/Error";

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export const deleteMajor = async (
  req: Request<any, any, any, { id: ObjectId; groupId: ObjectId }>,
  res: Response
) => {
  try {
    const { id, groupId } = req.query;
    const groups = await DictionaryModel.findById(groupId).lean();
    const major = groups?.majors?.find(
      (item) => item._id?.toString() === id.toString()
    );
    if (major?.imageKey) {
      await cloudinary.uploader.destroy(major?.imageKey);
    }
    const updatedDictionary = await DictionaryModel.findByIdAndUpdate(
      groupId,
      {
        $pull: { majors: { _id: id } },
      },
      { new: true }
    );

    if (!updatedDictionary) {
      return res.send(
        ErrorUtils.get("DICTIONARY_ID_OR_ENTRY_ID_DELETE_NOT_FOUND")
      );
    }
    return res.send({ code: 200 });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
