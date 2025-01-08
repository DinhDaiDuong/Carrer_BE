import { Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest } from "../../utils/types/meta";

export const getAccount = async (
  req: TRequest<any, { userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.query;
    const id = userId || req.userId;
    const account = await AccountModel.findById(id)
      .select("-password")
      .populate("groups", "_id");
    // Extract the group IDs as strings
    const groupIds = account?.groups.map((group) => group._id.toString());

    // Filter and transform the permissions
    const transformedPermissions = account?.permissions
      ?.filter((permission) => {
        const { create, edit, delete: del, view } = permission.permission;
        return create || edit || del || view; // Keep only if at least one is true
      })
      ?.map((permission) => ({
        code: permission.code,
        name: permission.name,
        permission: {
          create: permission.permission.create,
          edit: permission.permission.edit,
          delete: permission.permission.delete,
          view: permission.permission.view,
        },
      }));

    return res.send({
      code: 200,
      data: {
        ...account?.toObject(),
        groups: groupIds,
        permissions: userId
          ? account?.toObject().permissions
          : transformedPermissions || [],
      },
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
