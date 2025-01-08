import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

type TParams = {
  id: number;
};
export const verifyAccount = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { id } = req.query;
    await AccountModel.findByIdAndUpdate(id, {
      status: 1,
    }).then((value) => {
      return res.send({ code: 200 });
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
