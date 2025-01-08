import { Response, Request } from "express";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import csv from "csvtojson";
import {
  EGroup,
  IDictionary,
  IDictionaryResponse,
  IMajor,
  TGroup,
} from "../../utils/interfaces/Dictionary";
import lodash from "lodash";
import { addNewDictionary } from "./utils/addNewDictionary";
import { DictionaryModel } from "../../models/Dictionary";
import path from "path";
import { promises as fsPromises } from "fs-extra";
export const uploadFileDictionary = async (
  req: Request,
  res: Response<IDictionaryResponse | IErrorData>
) => {
  try {
    const { isReplaceAll = true } = req.query;
    const dictionary = await csv().fromFile(req.file?.path!);
    const validateDictionary = dictionary?.filter((item: IDictionary) =>
      Object.values(EGroup).includes(item.group)
    );
    const groupedDictionary = lodash.groupBy(validateDictionary, "group");
    if (JSON.parse(isReplaceAll as string)) {
      await DictionaryModel.deleteMany({});
    }
    const results: IDictionary[] = [];
    const savedDictionary = Object.keys(groupedDictionary).map(
      async (group) => {
        const majors: IMajor[] = groupedDictionary[group].map((major) => ({
          name: major.name,
          image: major.image,
          subjects: major.subjects,
          pros: major.pros,
          cons: major.cons,
        }));
        return await addNewDictionary(group as TGroup, majors).then(
          (result: any) => {
            results.push(result);
          }
        );
      }
    );
    const directoryPath = path.join(__dirname, "../../../public/uploads");
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      await fsPromises.unlink(filePath);
      console.log("Successfully deleted file: ", filePath);
    }
    Promise.all(savedDictionary).then(() => {
      return res.send({ code: 200, data: results });
    });
  } catch (e) {
    //console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
