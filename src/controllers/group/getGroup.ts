import { Request, Response } from "express";
import { GroupModel } from "../../models/Group";
import ErrorUtils from "../../utils/constant/Error";
type TParam = {
  id: string;
};
export const getGroup = async (
  req: Request<any, any, any, TParam>,
  res: Response
) => {
  const { id } = req.query;

  try {
    const group = await GroupModel.findById(id)
      .populate("exams", "_id type name category status")
      .populate("owner", "_id name email status")
      .populate("members", "_id name email status");

    return res.status(200).send({
      code: 200,
      data: group,
      // data: {
      //   ...group,
      //   exam: group?.exams?.filter(
      //     (item) => item?.status !== EExamStatus.ACTIVE
      //   ),
      // },
    });
  } catch (error) {
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
