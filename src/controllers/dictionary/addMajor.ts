import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { DictionaryModel } from "../../models/Dictionary";
import ErrorUtils from "../../utils/constant/Error";
import { IMajor } from "../../utils/interfaces";
import { TRequest, TResponse } from "../../utils/types/meta";

export const addMajor = async (
  req: TRequest<IMajor, any>,
  res: Response<TResponse<void>>
) => {
  try {
    const { groupId } = req.body;

    // Find the user by ID
    const user = await AccountModel.findById(req.userId);
    if (!user) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    // Find the dictionary entry by group and creatorId if applicable
    const dictionary = await DictionaryModel.findById(groupId);

    if (!dictionary) {
      return res.status(404).send(ErrorUtils.get("DATA_NOT_FOUND"));
    }

    // Add the new major to the majors array
    dictionary.majors.push({
      groupId,
      ...req.body,
    });

    // // Save the updated dictionary document
    await dictionary.save();

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (e) {
    console.log("e", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
