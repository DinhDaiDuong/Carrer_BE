import { Request, Response } from "express";
import { generateToken } from "../../hooks/generateToken";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
import { TResponse } from "../../utils/types/meta";
type TBody = {
  email: string;
};
export const loginWithSocial = async (
  req: Request<any, any, TBody>,
  res: Response<TResponse<Partial<IAccount>>>
) => {
  const { email } = req.body;

  const account = await AccountModel.findOne({
    email,
  });

  // Check if account exists
  if (!account) {
    return res.status(401).json(ErrorUtils.get("EMPTY_EMAIL"));
  }

  // Ensure account.password is defined before calling bcrypt.compare

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
};
