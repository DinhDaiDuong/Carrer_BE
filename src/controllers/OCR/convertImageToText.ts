import { Request, Response } from "express";
import { createWorker } from "tesseract.js";

export const convertImageToText = async (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }
  const { createWorker } = require('tesseract.js')
  const worker = await createWorker();

  try {
    await worker.load();
    await worker.loadLanguage('vie');
    await worker.initialize('vie');
    const { data: { text } } = await worker.recognize(imageUrl);
    await worker.terminate();
    return res.json({ text });
  } catch (error) {
    await worker.terminate();
    return res.status(500).json({ error: (error as Error).message });
  }
};