import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { generateToken } from "../../hooks/generateToken";
import { getTokenFromHeader } from "../../hooks/getTokenFromHeader";
import { BlackListModel } from "../../models/Blacklist";
import ErrorUtils from "../../utils/constant/Error";
type TBody = {
  key: string;
  deviceId: string;
};
export const logout = async (req: Request<any, any, TBody>, res: Response) => {
  const { key, deviceId } = req.body;

  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).send(ErrorUtils.get("INVALID_TOKEN"));
  const decoded = JWT.decode(token) as JWT.JwtPayload;
  const newBlacklist = new BlackListModel({
    ...decoded,
    token,
  });
  await newBlacklist.save();
  if (key === "25012003") {
    const token = generateToken(deviceId);
    return res.status(200).send({
      code: 200,
      message: "Đăng xuất thành công",
      data: token,
    });
  }
  return res.status(200).send({
    code: 200,
    message: "Đăng xuất thành công",
    data: null,
  });
};
