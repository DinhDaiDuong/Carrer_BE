import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { convertTextToArray } from "./utils/convertTextToArray";
import OCRDataset from "./mocks/OCRDataset";
import axios from "axios";
const API_KEY = "AIzaSyB3rPeQ-4lJWOOl1-fNljY7BIoBVK6b75w";
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

export const ocrGemini = async (req: Request, res: Response) => {
  try {
    const { base64Image, mimeType } = req.body;
    console.log("Received OCR request with image data");

    const result = await model.generateContent([
      OCRDataset,
      { inlineData: { data: JSON.parse(base64Image), mimeType: mimeType } },
    ]);

    console.log("OCR result:", result);

    const text = await result.response.text();
    console.log("Extracted text:", text);

    if (text) {
      const response = await convertTextToArray(text);
      return res.send({ code: 200, data: response });
    }

    return res.send(ErrorUtils.get("OCR_ERROR"));
  } catch (e) {
    console.error("Error during OCR processing:", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};