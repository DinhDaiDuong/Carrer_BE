import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { sendVerifyChangePassword } from "../../hooks/sendVerifyEmail";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { TResponse } from "../../utils/types/meta";
type TBody = {
  username: string;
  newPassword: string;
};
export const forgotPassword = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<Partial<IAccount>>>
) => {
  const { username, newPassword } = req.body;

  const account = await AccountModel.findOne({
    username,
  });

  // Check if account exists
  if (!account) {
    return res.status(401).json(ErrorUtils.get("ACCOUNT_INVALID"));
  }

  // Ensure account.password is defined before calling bcrypt.compare

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await sendVerifyChangePassword([account.email], account.id, hashedPassword);
  return res.status(200).json(ErrorUtils.get("FORGOT_PASSWORD_SUCCESS"));
};
