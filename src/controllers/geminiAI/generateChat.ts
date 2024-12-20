import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import ErrorUtils from "../../utils/constant/Error";
import { dataSet } from "./dataSet";
// Access your API key as an environment variable (see "Set up your API key" above)
const API_KEY = "AIzaSyDFL0XYL3qq7v7Ipf0HRUfFrW-zWFE6Xbg";
const genAI = new GoogleGenerativeAI(API_KEY!);
const generationConfig = {
  maxOutputTokens: 200,
  temperature: 0.9,
};
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});
export const generateChat = async (req: Request, res: Response) => {
  // For text-only input, use the gemini-pro model
  const { prompt } = req.body;
  const isLock = false;
  try {
    if (!prompt) return res.send(ErrorUtils.get("PROMT_IS_EMPTY"));
    if (isLock) return res.send(ErrorUtils.get("LOCK_AI"));
    const parts = [{ text: dataSet({ question: prompt }) }];
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    if (result?.response?.candidates) {
      if (
        result?.response?.candidates![0].content.parts[0].text ===
        "Sorry! I do not have enough information to answer this question"
      ) {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("text", text);
        return res.send({
          code: 200,
          data: text,
        });
      }
    }
    return res.send({
      code: 200,
      data: result?.response?.candidates![0].content.parts[0].text,
    });
  } catch (e) {
    console.log(e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
