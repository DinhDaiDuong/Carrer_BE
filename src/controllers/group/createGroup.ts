import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { IGroup } from "../../utils/interfaces/Group";

type TBody = Partial<IGroup>;
export const createGroup = async (
  req: Request<any, any, TBody>,
  res: Response
) => {
  const data = req.body;

  console.log("create group", data);

  // Validate input data
  if (
    !data.groupName ||
    !data.owner ||
    !data.members ||
    data.members.length === 0
  ) {
    return res.status(400).send(ErrorUtils.get("ERROR_INVALID"));
  }

  // Validate the owner
  const isValidOwner = await AccountModel.findById(data.owner);
  if (!isValidOwner) {
    return res.status(400).send(ErrorUtils.get("ACCOUNT_INVALID"));
  }
  if (isValidOwner.role === "STUDENT" || isValidOwner.role === "ANONYMOUS") {
    return res.status(400).send(ErrorUtils.get("INVALID_PERMISSION"));
  }

  // Validate the members
  const validUsers = await AccountModel.find({
    _id: {
      $in: data.members,
    },
  });
  if (validUsers.length !== data.members.length) {
    return res.status(400).send(ErrorUtils.get("ACCOUNT_INVALID"));
  }

  // Create the new group
  const newGroup = new GroupModel({
    ...data,
    status: 1,
  });

  await newGroup.save();

  // Add the group to the owner's groups
  await AccountModel.findByIdAndUpdate(data.owner, {
    $push: { groups: newGroup._id },
  });

  // Optionally, add the group to the members' groups
  await AccountModel.updateMany(
    { _id: { $in: data.members } },
    { $push: { groups: newGroup._id } }
  );

  res.status(201).send({ code: 200, groupId: newGroup._id });
};
