import { Request, Response } from "express";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { IGroup } from "../../utils/interfaces/Group";
type TParam = {
  id: string;
};
export const updateGroup = async (
  req: Request<
    any,
    any,
    Omit<Partial<IGroup>, "updatedAt" | "createdAt">,
    TParam
  >,
  res: Response
) => {
  const { id } = req.query;
  try {
    await GroupModel.findByIdAndUpdate(id, {
      ...req.body,
    }).then((value) => {
      return res.send({ code: 200, data: value });
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
