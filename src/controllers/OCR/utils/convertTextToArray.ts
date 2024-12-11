import { ObjectId } from "mongoose";
import { SubjectsModel } from "../../../models/Subjects";
import { ISubject } from "../../../utils/interfaces/SchoolSubjects";
type TSubjectWithValue = {
  _id?: ObjectId;
  vnName?: string;
  value?: string;
  name?: string;
};
export const convertTextToArray = async (text: string) => {
  const lines = text.split("\n");
  const results = new Map<string, TSubjectWithValue>();
  const subjectsWithValue: TSubjectWithValue[] = [];
  for (const line of lines) {
    //subjects.push(line?.trim());
    const [subject, score] = line.split(":").map((item: any) => item.trim());
    subjectsWithValue.push({
      vnName: subject,
      value: score,
    });
  }
  const subjects = await SubjectsModel.find({});
  if (subjects) {
    subjects?.map((subject: ISubject, index) => {
      //console.log("subject", subject);
      const existSubject = subjectsWithValue?.find(
        (item) => item.vnName === subject.vnName
      );
      results.set(subject.name, {
        _id: subject?._id,
        name: subject?.name,
        vnName: subject?.vnName,
        value: existSubject ? existSubject?.value : "",
      });
    });
  }
  return Object.fromEntries(results);
};
