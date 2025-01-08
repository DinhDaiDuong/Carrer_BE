import { Response, Request } from "express";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import csv from "csvtojson";
import { IConclusion, IConclusionResponse } from "../../utils/interfaces";
import { ConclusionModel } from "../../models/Conclusion";
import path from "path";
import { promises as fsPromises } from "fs-extra";
export const uploadConclusion = async (
  req: Request,
  res: Response<IConclusionResponse | IErrorData>
) => {
  try {
    const { isReplaceAll = true } = req.query;
    const conclusions = await csv().fromFile(req.file?.path!);
    const validateConclusions = conclusions?.filter(
      (conclusion: IConclusion) => conclusion.Type !== ""
    );
    if (JSON.parse(isReplaceAll as string)) {
      await ConclusionModel.deleteMany({});
    }
    await ConclusionModel.insertMany(validateConclusions).then(async () => {
      // Delete file in vscode after add in mongodb
      const directoryPath = path.join(__dirname, "../../../public/uploads");
      const files = await fsPromises.readdir(directoryPath);
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        await fsPromises.unlink(filePath);
        console.log("Successfully deleted file: ", filePath);
      }

      ///////////////
      return res.send({
        code: 200,
        data: validateConclusions,
      });
    });
  } catch (e) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
