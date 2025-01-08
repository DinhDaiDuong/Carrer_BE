import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { ConclusionModel } from "../../models/Conclusion";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import { IConclusion } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";

export const addConclusion = async (
  req: TRequest<IConclusion>,
  res: Response<TResponse<void> | IErrorData>
) => {
  try {
    const creator = await AccountModel.findById(req.userId);
    if (!!creator?.email) {
      const newConclusion = new ConclusionModel({
        ...req.body,
        creator: creator?.email,
        updator: creator?.email,
        creatorId: creator?.id,
        groupId: [],
      });
      await newConclusion.save().then((savedConclusion) => {
        console.log("");
        return res.send({
          code: 200,
          data: savedConclusion,
          message: "Success",
        });
      });
    } else {
      return res.send(ErrorUtils.get("ACCOUNT_INVALID"));
    }
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
