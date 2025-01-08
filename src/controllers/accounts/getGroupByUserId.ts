import { Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest } from "../../utils/types/meta";

export const getGroupByUserId = async (
  req: TRequest<any, { userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.query;
    const id = userId || req.userId;
    console.log("id", userId);
    const account = await AccountModel.findById(id)
      .select("-password")
      .populate({
        path: "groups",
        select: "_id owner groupName", // Select necessary fields from GroupModel
        populate: {
          path: "owner", // Populate the owner field in GroupModel
          select: "name", // Select the 'name' field from the referenced owner
        },
      });
    // Extract the group IDs as strings
    // console.log(account);

    console.log("okkk >>>>", account?.groups);
    return res.send({
      code: 200,
      data: account?.groups,
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
