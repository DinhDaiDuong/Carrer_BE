import { Response } from "express";
import mongoose from "mongoose";
import { AccountModel } from "../../models/Account";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { TRequest, TResponseWithPagination } from "../../utils/types/meta";

type TParams = {
  userId: string;
};

export const getListMemberAccount = async (
  req: TRequest<any, TParams>,
  res: Response<Partial<TResponseWithPagination<IAccount[]>>>
) => {
  try {
    const { userId } = req.query;

    const accounts = await AccountModel.find({
      creatorId: userId,
    })
      .select("-password")
      .populate("groups", "_id groupName");
    console.log(accounts);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log(accounts, userObjectId);

    const membersInGroup = await GroupModel.find({
      owner: userObjectId,
    }).populate({
      path: "members",
      select: "-password", // Select members without password
      populate: {
        path: "groups", // Populate groups inside each member
        select: "_id groupName", // Select only group _id and groupName
      },
    });

    // Merge the accounts and members
    const mergedMembers = [
      ...accounts,
      ...membersInGroup.flatMap((group) => group.members),
    ];
    // Remove duplicates by _id using filter and a seenIds set
    const seenIds = new Set();
    const uniqueMembers = mergedMembers.filter((member) => {
      //@ts-ignore no check
      const id = member.id; // Convert _id to string for comparison
      if (seenIds.has(id)) {
        return false; // Skip if already seen
      }
      seenIds.add(id); // Add the _id to seenIds set
      return true; // Include this member in the result
    });

    // Return the unique members in the response
    return res.send({
      code: 200,
      data: uniqueMembers as any, // Return the unique members here
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
