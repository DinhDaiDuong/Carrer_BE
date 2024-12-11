import { Response, Request } from "express";
import ErrorUtils, { IErrorData } from "../../utils/constant/Error";
import {
  ISchool,
  ISchoolByArea,
  ISchoolRequest,
  ISchoolResponse,
} from "../../utils/interfaces/School";
import csv from "csvtojson";
import { SchoolModel } from "../../models/School";
import lodash from "lodash";
import { promises as fsPromises } from "fs-extra";
import path from "path";
export const addSchool = async (
  req: Request,
  res: Response<ISchoolResponse | IErrorData>
) => {
  try {
    const { isReplaceAll = true } = req.query;
    const schools = await csv().fromFile(req.file?.path!);
    const validateSchools = schools?.filter(
      (item: ISchoolRequest) => item?.schools !== ""
    );
    const groupedSchools = lodash.groupBy(validateSchools, "group");
    if (JSON.parse(isReplaceAll as string)) {
      await SchoolModel.deleteMany({});
    }
    const results: ISchool[] = [];
    const savedSchools = Object.keys(groupedSchools).map(async (group) => {
      const schoolList: ISchoolByArea[] = groupedSchools[group].map(
        (item: ISchoolByArea) => ({
          area: item?.area,
          schools: item?.schools,
        })
      );
      const existedGroup = await SchoolModel.findOne({ group: group });
      if (existedGroup) {
        await SchoolModel.findOneAndUpdate(
          { group },
          { $addToSet: { schoolList: { $each: schoolList } } },
          { new: true }
        ).then((updatedGroup: any) => {
          results.push(updatedGroup);
        });
      } else {
        const newGroup = new SchoolModel({
          group: group,
          schoolList: schoolList,
        });
        await newGroup.save().then((savedGroup) => {
          results.push(savedGroup);
        });
      }
    });
    const directoryPath = path.join(__dirname, "../../../public/uploads");
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      await fsPromises.unlink(filePath);
      //console.log("Successfully deleted file: ", filePath);
    }
    Promise.all(savedSchools).then(() => {
      return res.send({
        code: 200,
        data: results,
      });
    });
  } catch (e) {
    //console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
