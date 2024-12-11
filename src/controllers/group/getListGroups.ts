import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { GroupModel } from "../../models/Group";
import { ERole } from "../../utils/enums/account.enum";
import { IGroup } from "../../utils/interfaces/Group";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

type TParams = {
  groupName: string;
  status: number; // 1: Active , 0: Deactive
  direction?: number; // -1: DESC, 1: ASC
  page: number;
  size: number;
};
export const getListGroups = async (
  req: TRequest<any, TParams & Partial<TPagingParams>>,
  res: Response<Partial<TResponseWithPagination<IGroup[]>>>
) => {
  try {
    const {
      groupName,
      status,
      direction = -1,
      page = 1,
      size = 10,
    } = req.query;
    let query: any = {};

    const creator = await AccountModel.findById(req.userId);
    if (creator?.toObject()?.role !== ERole.ADMIN) {
      query.owner = creator?.id;
    }

    if (groupName) {
      const groupNamePattern = new RegExp(groupName, "i");
      query["$or"] = [{ groupName: groupNamePattern }];
    }
    if (status !== undefined) {
      query.status = +status; // Add status to the query if provided
    }
    console.log(query);
    const groups = await GroupModel.find(query)
      .populate("members", "_id email name status")
      .populate("owner", "_id email name status")
      .sort({ updatedAt: +direction === 1 ? 1 : -1 })
      .skip((page - 1) * size)
      .limit(size)
      .exec();
    const countGroups = await GroupModel.countDocuments(query);
    return res.send({
      code: 200,
      data: groups,
      pagination: {
        size: +size,
        page: +(page - 1),
        totalCounts: countGroups,
        totalPages: Math.ceil(countGroups / +size),
      },
    });
  } catch (error) {}
};
