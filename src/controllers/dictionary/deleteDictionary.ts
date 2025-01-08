import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { ObjectId } from "mongoose";
import { DictionaryModel } from "../../models/Dictionary";
export const deleteDictonary = async (
  req: Request<any, any, any, { id: ObjectId }>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const deleteDictonary = await DictionaryModel.deleteOne(
      DictionaryModel.findById(id)
    );
    if (deleteDictonary.deletedCount === 0) {
      return res.send(ErrorUtils.get("DICTIONARY_ID_DELETE_NOT_FOUND"));
    }
    return res.send({ code: 200 });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
