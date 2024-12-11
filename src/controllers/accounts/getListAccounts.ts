import { Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IAccount } from "../../utils/interfaces/Account";
import {
  TPagingParams,
  TRequest,
  TResponseWithPagination,
} from "../../utils/types/meta";

type TParams = {
  status?: number; // 1: active, 0: deactive
  name?: string;
  email?: string;
  role?: string;
  direction?: number; // -1: DESC, 1: ASC
};

export const getListAccounts = async (
  req: TRequest<any, TParams & Partial<TPagingParams>>,
  res: Response<Partial<TResponseWithPagination<IAccount[]>>>
) => {
  try {
    const {
      email,
      name,
      role = "",
      status,
      direction = -1,
      page = 1,
      size = 10,
    } = req.query;
    let query: any = {};

    const creator = await AccountModel.findById(req.userId);

    if (creator?.toObject()?.role !== ERole.ADMIN) {
      query.creatorId = creator?.id;
    }

    if (email && name) {
      const emailPattern = new RegExp(email, "i");
      const namePattern = new RegExp(name, "i");

      query["$or"] = [{ email: emailPattern }, { name: namePattern }];
    } else {
      if (email) {
        const emailPattern = new RegExp(email, "i");
        query["$or"] = [{ email: emailPattern }];
      }
      if (name) {
        const namePattern = new RegExp(name, "i");
        query["$or"] = [{ name: namePattern }];
      }
    }

    if (status !== undefined) {
      query.status = status; // Add status to the query if provided
    } else {
      query["$or"] = [{ status: 0 }, { status: 1 }];
    }

    if (role) {
      const accounts = await AccountModel.find(query)
        .where({
          role: role || "",
          status: 0 || 1,
        })
        .populate("groups", "_id groupName")
        .select("-password")
        .sort({ updatedAt: direction === 1 ? 1 : -1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

      const countAccounts = await AccountModel.countDocuments(query);
      return res.send({
        code: 200,
        data: accounts,
        pagination: {
          size: +size,
          page: +page,
          totalCounts: countAccounts,
          totalPages: Math.ceil(countAccounts / +size),
        },
      });
    } else {
      const accounts = await AccountModel.find(query)
        .select("-password")
        .populate("groups", "_id groupName")
        .sort({ updatedAt: direction === 1 ? 1 : -1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

      const countAccounts = await AccountModel.countDocuments(query);
      return res.send({
        code: 200,
        data: accounts,
        pagination: {
          size: +size,
          page: +page,
          totalCounts: countAccounts,
          totalPages: Math.ceil(countAccounts / +size),
        },
      });
    }
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
