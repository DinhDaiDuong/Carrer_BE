import { Response } from "express";
import { AccountModel } from "../../models/Account";
import { DoExamModal } from "../../models/DoExam";
import { ExamModel } from "../../models/Exam";
import ErrorUtils from "../../utils/constant/Error";
import { EQuestionType } from "../../utils/enums/exam.enum";
import { IExam } from "../../utils/interfaces";
import {
  IAddDoExamREQ,
  IDoExam,
  IMyAnswer,
} from "../../utils/interfaces/DoExam";
import { TRequest, TResponse } from "../../utils/types/meta";

export const addDoExam = async (
  req: TRequest<IAddDoExamREQ>,
  res: Response<TResponse<IDoExam>>
) => {
  try {
    const { examId, myAnswers, groupId } = req.body;

    // Fetch creator and validate account existence
    const creator = await AccountModel.findById(req.userId);
    if (!creator) return res.send(ErrorUtils.get("ACCOUNT_INVALID"));

    // Fetch exam and validate its existence
    const exam: IExam | null = await ExamModel.findById(examId);
    if (!exam) return res.send(ErrorUtils.get("EXAM_NOT_FOUND"));

    // SAVE ANSWER
    const savedAnswers: IMyAnswer[] = [];

    // CALCULATE SCORE
    const totalScore =
      exam.questions?.reduce((acc, question) => {
        const myAnswer = myAnswers?.find(
          (item) => item.questionId.toString() === question._id.toString()
        );
        if (!myAnswer) return acc;

        const questionScore =
          question.options?.reduce((sum, option) => {
            const optionId = option._id.toString();

            if (question.questionType === EQuestionType.SHORT_ANSWER) {
              return myAnswer?.shortAnswer?.toLowerCase() ===
                option.content.toLocaleLowerCase()
                ? sum + (option.standardScore || 0)
                : sum;
            }

            // Add score if the option is correct and selected by the user
            return option.isResult &&
              (myAnswer.answers as unknown as string[])?.includes(optionId)
              ? sum + (option.standardScore || 0)
              : sum;
          }, 0) || 0; // Default to 0 if options are undefined

        savedAnswers.push({ ...myAnswer, score: questionScore });
        return acc + questionScore;
      }, 0) || 0; // Default totalScore to 0 if no questions are present

    // Find Comment of Teacher
    const result = exam?.results.find(
      (item) =>
        Array.isArray(item.score) &&
        totalScore >= item.score?.[0] &&
        totalScore <= item.score?.[1]
    );

    // SAVE ANSWER TO DB
    const newAnswer = new DoExamModal({
      examId,
      examName: exam?.name,
      groupId,
      totalScore,
      myAnswers: savedAnswers,
      creator: creator?.email,
      creatorId: creator?.id,
      result: result,
    });
    await newAnswer.save().then(async (data) => {
      return res.send({
        code: 200,
        message: "Success!",
        data,
      });
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
