import { Request, Response } from "express";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { IGroup } from "../../utils/interfaces/Group";
import { TPagingResponse } from "../../utils/types/meta";

export const getListGroupSelect = async (
  req: Request<any, any, any, any>,
  res: Response<Partial<TPagingResponse<IGroup[]>>>
) => {
  try {
    const filteredGroup = await GroupModel.find().select("_id groupName");

    return res.send({
      code: 200,
      data: filteredGroup,
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
