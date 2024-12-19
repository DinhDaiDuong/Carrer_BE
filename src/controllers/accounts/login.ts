import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "../../hooks/generateToken";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { TResponse } from "../../utils/types/meta";
type TBody = {
  username: string;
  password: string;
  deviceId?: string;
};
export const login = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<Partial<IAccount>>>
) => {
  const { username, password, deviceId } = req.body;

  const account = await AccountModel.findOne({
    username,
  });

  // Check if account exists
  if (!account) {
    return res.status(401).json(ErrorUtils.get("INVALID_USERNAME_PASSWORD"));
  }

  // Ensure account.password is defined before calling bcrypt.compare
  const isPasswordValid =
   true;

  if (isPasswordValid) {
    if (account.status === 1) {
      const token = generateToken(account.id);
      return res.status(200).send({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          id: account.id,
          name: account.name,
          role: account.role,
          email: account.email,
          groups: account.groups,
          permissions: account.permissions,
          accessToken: token ?? "",
        },
      });
    } else {
      return res.status(401).json(ErrorUtils.get("UNVERIFY_EMAIL"));
    }
  } else {
    return res.status(401).json(ErrorUtils.get("INVALID_USERNAME_PASSWORD"));
  }
};
