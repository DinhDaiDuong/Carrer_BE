import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IDictionary } from "../../utils/interfaces/Dictionary";
import { Request, Response } from "express";
import { addNewDictionary } from "./utils/addNewDictionary";
import { TRequest, TResponse } from "../../utils/types/meta";
import { AccountModel } from "../../models/Account";
export const addDictionary = async (
  req: TRequest<IDictionary>,
  res: Response<TResponse<void> | IErrorData>
) => {
  try {
    const { group, majors } = req.body;
    const creator = await AccountModel.findById(req.userId);
    if (!!creator) {
      await addNewDictionary(group, majors, creator).then((savedGroup) => {
        console.log("saved", savedGroup);
        return res.send({ code: 200, data: savedGroup, message: "Success" });
      });
    } else {
      return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    }
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
