import { Request, Response } from "express";
import { generateToken } from "../../hooks/generateToken";
import ErrorUtils from "../../utils/constant/Error";

type TParam = {
  key: string;
  deviceId: string;
};
export const getAccessToken = async (
  req: Request<any, any, any, TParam>,
  res: Response
) => {
  try {
    const { key, deviceId } = req.query;
    if (key === "25012003") {
      const token = generateToken(deviceId);
      return res.status(200).send({
        code: 200,
        message: "Đăng nhập thành công",
        data: {
          token: token,
        },
      });
    }
    return res.status(400).send(ErrorUtils.get("INVALID_TOKEN"));
  } catch (error) {
    return res.status(400).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
