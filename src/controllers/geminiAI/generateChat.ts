import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import ErrorUtils from "../../utils/constant/Error";
import { dataSet } from "./dataSet";

// Access your API key as an environment variable
const API_KEY = "AIzaSyBRy--41ihCzQLQweCF7BHiZDcWnECzKek";
if (!API_KEY) {
  throw new Error("API key for Google Generative AI is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const generationConfig = {
  maxOutputTokens: 200,
  temperature: 0.9,
};
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

export const generateChat = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const isLock = false;
  try {
    if (!prompt) return res.status(400).send(ErrorUtils.get("PROMT_IS_EMPTY"));
    if (isLock) return res.status(403).send(ErrorUtils.get("LOCK_AI"));

    const parts = [{ text: dataSet({ question: prompt }) }];
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    if (result?.response?.candidates) {
      const candidateText = result.response.candidates[0].content.parts[0].text;
      if (candidateText === "Sorry! I do not have enough information to answer this question") {
        const fallbackResult = await model.generateContent(prompt);
        const fallbackResponse = await fallbackResult.response;
        const fallbackText = await fallbackResponse.text();
        console.log("Fallback text:", fallbackText);
        return res.status(200).send({
          code: 200,
          data: fallbackText,
        });
      }
      return res.status(200).send({
        code: 200,
        data: candidateText,
      });
    }

    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  } catch (e) {
    if (e instanceof Error && e.message.includes("Quota exceeded")) {
      console.error("Rate limit exceeded:", e);
      return res.status(429).send({
        code: 429,
        message: "Quota exceeded. Please try again later.",
      });
    }
    console.error("Error during chat generation:", e);
    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  }
};