import { Request, Response } from "express";
import { ConclusionModel } from "../../models/Conclusion";
import ErrorUtils from "../../utils/constant/Error";
export const getConclusion = async (req: Request, res: Response) => {
  try {
    const { Holland = "R", IQ = "-", EQ = "-", SchoolScore = "A" } = req.body;
    const query = ConclusionModel.where({ Holland, IQ, EQ, SchoolScore });
    const conclusion = await query.findOne();
    if (conclusion) {
      return res.send({
        code: 200,
        data: conclusion,
      });
    }
    return res.send(ErrorUtils.get("CONCLUSION_NOT_EXIST"));
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
