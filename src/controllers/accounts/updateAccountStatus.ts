import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
type TBody = {
  status: number;
};
type TParams = {
  id: number;
};
export const updateStatusAccount = async (
  req: Request<any, any, TBody, TParams>,
  res: Response
) => {
  try {
    const { id } = req.query;
    const { status } = req.body;
    await AccountModel.findByIdAndUpdate(id, {
      status: status,
    }).then((value) => {
      return res.send({ code: 200 });
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
