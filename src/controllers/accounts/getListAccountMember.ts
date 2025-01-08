import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { TResponse } from "../../utils/types/meta";

type TParams = {
  keyword?: string;
};
type TAccountMember = { _id: string; name: string; email: string };

export const getListAccountMember = async (
  req: Request<any, any, any, TParams>,
  res: Response<Partial<TResponse<TAccountMember[]>>>
) => {
  try {
    const { keyword = "" } = req.query;
    const accounts = await AccountModel.find({
      $and: [
        { status: 1, $or: [{ role: "STUDENT" }, { role: "TEACHER" }] },
        {
          $or: [
            { username: { $regex: keyword || "", $options: "i" } },
            { name: { $regex: keyword || "", $options: "i" } },
          ],
        },
      ],
    }).select(["name", "_id", "email", "role"]);

    return res.send({
      code: 200,
      //@ts-expect-error no check
      data: accounts,
      message: "",
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
