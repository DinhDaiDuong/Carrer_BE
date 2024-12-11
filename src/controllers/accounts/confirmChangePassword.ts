import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

type TParams = {
  id: number;
  token: string;
};
export const confirmChangePassword = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { id, token } = req.query;
    await AccountModel.findByIdAndUpdate(id, {
      status: 1,
      password: token,
    }).then((value) => {
      return res.send({ code: 200 });
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
