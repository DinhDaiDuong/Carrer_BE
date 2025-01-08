import { Response, Request } from "express";
import { SubjectsModel } from "../../models/Subjects";
import ErrorUtils from "../../utils/constant/Error";
import { ObjectId } from "mongoose";
export const deleteSubjects = async (
  req: Request<any, any, { id: ObjectId }>,
  res: Response
) => {
  const { id } = req.query;
  try {
    const deletedSubjects = await SubjectsModel.deleteMany({
      _id: { $in: id },
    });
    if (deletedSubjects.deletedCount === 0) {
      return res.send(ErrorUtils.get("SUBJECT_ID_DELETE_NOT_FOUND")!);
    }
    return res.send({
      code: 200,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
