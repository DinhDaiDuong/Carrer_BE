import { BlackListModel } from "../../models/Blacklist";

export const deleteBlacklist = async () => {
  // Delete all entries from the Blacklist collection
  await BlackListModel.deleteMany({});
};
