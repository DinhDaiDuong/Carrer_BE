import { NextFunction, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
import { getTokenFromHeader } from "../hooks/getTokenFromHeader";
import { BlackListModel } from "../models/Blacklist";
import ErrorUtils from "../utils/constant/Error";
import { TRequest } from "../utils/types/meta";

// Middleware to check token validity
export const verifyToken = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  const jwtSecretKey = "25012003";

  const token = getTokenFromHeader(req);
  // if (token === null) {
  //   next();
  // }
  if (!token) return res.status(401).send(ErrorUtils.get("INVALID_TOKEN"));
  const blacklist = await BlackListModel.findOne({ token: token });
  if (blacklist) return res.status(401).send(ErrorUtils.get("INVALID_TOKEN"));
  try {
    const verified: JwtPayload | string = JWT.verify(token, jwtSecretKey);
    console.log("okk", (verified as JwtPayload)?.userId);
    if ((verified as JwtPayload)?.userId) {
      req.userId = (verified as JwtPayload)?.userId;
    }
    next();
  } catch (err) {
    await BlackListModel.deleteOne({ token: token });
    res.status(401).send(ErrorUtils.get("INVALID_TOKEN"));
  }
};
