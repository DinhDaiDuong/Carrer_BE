import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { generateToken } from "../../hooks/generateToken";
import { getTokenFromHeader } from "../../hooks/getTokenFromHeader";
import { BlackListModel } from "../../models/Blacklist";

export const refreshToken = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  try {
    const jwtSecretKey = "25012003";

    const token = getTokenFromHeader(req);
    if (token) {
      const decoded: { userId: string } = JWT.verify(token, jwtSecretKey, {
        ignoreExpiration: true,
      }) as any;
      const newBlacklist = new BlackListModel({
        ...decoded,
        token,
      });
      await newBlacklist.save();
      const newToken = generateToken(decoded.userId);
      res.status(200).json({
        message: "Refresh success",
        data: newToken,
      });
    }
  } catch {
    res.status(401).json({
      message: "Token hết hạn",
      data: {},
    });
  }
};
