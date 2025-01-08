import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { IDictionary } from "../../utils/interfaces/Dictionary";
import { ObjectId } from "mongoose";
import { DictionaryModel } from "../../models/Dictionary";
export const updateDictionary = async (
  req: Request<any, any, IDictionary, { id: ObjectId; groupId: ObjectId }>,
  res: Response
) => {
  try {
    const { id, groupId } = req.query;
    const updatedDictionary = await DictionaryModel.findOneAndUpdate(
      { _id: groupId, "majors._id": id },
      {
        $set: { "majors.$": { _id: id, ...req.body } },
      },
      {
        new: true,
      }
    );
    if (!updatedDictionary) {
      return res.send(ErrorUtils.get("UPDATED_DICTIONARY_NOT_FOUND"));
    }
    return res.send({
      code: 200,
      data: updatedDictionary,
    });
  } catch (e) {
    //console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
