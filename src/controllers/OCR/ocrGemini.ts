import { Response, Request } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { convertTextToArray } from "./utils/convertTextToArray";
import OCRDataset from "./mocks/OCRDataset";
import vision from "@google-cloud/vision";

const API_KEY = "AIzaSyB3rPeQ-4lJWOOl1-fNljY7BIoBVK6b75w";
if (!API_KEY) {
  console.error("API key is not set. Please set the OCR_KEY environment variable.");
}
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const client = new vision.ImageAnnotatorClient();

export const ocrGemini = async (req: Request, res: Response) => {
  try {
    const { base64Image, mimeType } = req.body;
    console.log("Received OCR request with image data");

    // Use Google Cloud Vision API to extract text from the image
    const [result] = await client.textDetection({
      image: { content: base64Image },
    });

    const detections = result.textAnnotations || [];
    const extractedText = detections.length > 0 ? detections[0].description : "";

    console.log("Extracted text:", extractedText);

    if (extractedText) {
      const response = await convertTextToArray(extractedText);
      return res.send({ code: 200, data: response });
    }

    return res.send(ErrorUtils.get("OCR_ERROR"));
  } catch (e) {
    console.error("Error during OCR processing:", e);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};