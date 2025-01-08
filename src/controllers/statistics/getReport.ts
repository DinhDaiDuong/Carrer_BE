import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { ReportModel } from "../../models/Report";
import ErrorUtils from "../../utils/constant/Error";
import { ERole } from "../../utils/enums/account.enum";
import { IReport } from "../../utils/interfaces/Statistics";
import { TRequest, TResponse } from "../../utils/types/meta";

export const getReport = async (
  req: TRequest<any, any>,
  res: Response<TResponse<IReport[]>>
) => {
  try {
    const user = await AccountModel.findById(req.userId);
    if (user?.role !== ERole.ADMIN) {
      return res.send(ErrorUtils.get("PERMISSION_DENIED"));
    }

    const report = await ReportModel.find({}).select("-createdAt -updatedAt");

    return res.send({
      code: 200,
      data: report,
    });
  } catch (error) {
    console.log(error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
