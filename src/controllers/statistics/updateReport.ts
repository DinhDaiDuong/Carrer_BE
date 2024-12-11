import { Response } from "express";
import { ReportModel } from "../../models/Report";
import ErrorUtils from "../../utils/constant/Error";
import { IReport } from "../../utils/interfaces/Statistics";
import { TRequest, TResponse } from "../../utils/types/meta";

export const updateReport = async (
  req: TRequest<{ reports: IReport[] }, any>,
  res: Response<TResponse<void>>
) => {
  try {
    const { reports } = req.body;
    if (!Array.isArray(reports) || reports.length === 0) {
      return res.status(400).send(ErrorUtils.get("EMPTY_DATA"));
    }
    // Process updates for each report asynchronously
    await Promise.all(
      reports?.map(async (report) => {
        const { type, score } = report;
        if (!!type) {
          await ReportModel.findOneAndUpdate(
            { type, score },
            { $inc: { count: 1 } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        }
      })
    );

    return res.send({
      code: 200,
      message: "Success!",
    });
  } catch (error) {
    console.log(error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
