import { DictionaryModel } from "../../../models/Dictionary";
import { IAccount } from "../../../utils/interfaces";
import { IMajor, TGroup } from "../../../utils/interfaces/Dictionary";

const addNewDictionary = async (
  group: TGroup,
  majors: IMajor[],
  creator?: IAccount
) => {
  const existedGroup = await DictionaryModel.findOne({ group });
  console.log("creator", creator);
  if (existedGroup) {
    const updatedGroup = await DictionaryModel.findOneAndUpdate(
      { group: group },
      { $addToSet: { majors: { $each: majors } } },
      { new: true }
    );
    return updatedGroup;
  } else {
    const newGroup = new DictionaryModel({
      group,
      majors,
      creator: creator?.email,
      updator: creator?.email,
      creatorId: creator?.id,
    });
    const savedGroup = await newGroup.save();
    return savedGroup;
  }
};
export { addNewDictionary };
