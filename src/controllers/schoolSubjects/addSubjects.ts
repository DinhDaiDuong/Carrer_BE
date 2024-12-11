import { Response, Request } from "express";
import { SubjectsModel } from "../../models/Subjects";
import { ISubjects } from "../../utils/interfaces/SchoolSubjects";
import ErrorUtils from "../../utils/constant/Error";
import { AccountModel } from "../../models/Account";
import { TRequest } from "../../utils/types/meta";
export const addSubjects = async (req: TRequest<ISubjects>, res: Response) => {
  try {
    const { subjects } = req.body;

    const creator = await AccountModel.findById(req.userId);

    if (!!creator?.email) {
      const newSubjects = subjects?.map((subject) => ({
        ...subject,
        creatorId: creator?.id,
        creator: creator?.email,
        updator: creator?.email,
      }));
      await SubjectsModel.insertMany([...newSubjects]).then((savedSubjects) => {
        return res.send({
          code: 200,
          data: savedSubjects,
        });
      });
    } else {
      return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    }
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
