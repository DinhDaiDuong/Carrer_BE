import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { sendVerifyEmail } from "../../hooks/sendVerifyEmail";
import { AccountModel } from "../../models/Account";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
import { IAccount } from "../../utils/interfaces/Account";
type TBody = Partial<IAccount>;

export const createAccount = async (
  req: Request<any, any, TBody>,
  res: Response
) => {
  try {
    const data = req.body;
    if (!data.email) return res.status(400).send(ErrorUtils.get("EMPTY_EMAIL"));
    const isExisEmail = await AccountModel.findOne({
      email: data.email,
    });
    const isExistUserName = await AccountModel.findOne({
      username: data.username,
    });

    // Fetch creator and validate account existence
    const creator = await AccountModel.findById(req.userId);
    if (!creator) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    if (!isExisEmail && !isExistUserName) {
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Verify and link existing group IDs
        const groups = Array.isArray(data.groups)
          ? (await GroupModel.find({ _id: { $in: data.groups } })).map(
              (group) => group._id
            )
          : [];
        console.log({
          ...data,
          groups, // Assign group IDs directly
          status: 0,
          password: hashedPassword,
        });
        const newAccount = new AccountModel({
          ...data,
          groups, // Assign group IDs directly
          status: 0,
          password: hashedPassword,
          creatorId: creator._id,
          creator: creator.email,
        });

        await newAccount.save();
        if (data.email)
          await sendVerifyEmail([data.email], newAccount.id, newAccount.name);
        return res.send({ code: 200 });
      }
    }
    if (isExisEmail)
      return res.status(400).send(ErrorUtils.get("DUPLICATE_EMAIL"));
    if (isExistUserName)
      return res.status(400).send(ErrorUtils.get("DUPLICATE_USER_NAME"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};