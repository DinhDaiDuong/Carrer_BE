import { Request, Response } from "express";
import { createWorker } from "tesseract.js";
import * as path from 'path';
import * as fs from 'fs';
export const convertImageToText = async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, '../../assets/img/bangdiem.jpg'); // Adjust the path to your image
  const { createWorker } = require('tesseract.js')
  const worker = await createWorker();

  try {
    const image = fs.readFileSync(imagePath);
    const imageBase64 = image.toString('base64');
    const imageData = `data:image/jpeg;base64,${imageBase64}`;
    await worker.load();
    await worker.loadLanguage('vie');
    await worker.initialize('vie');
    const { data: { text } } = await worker.recognize(imageData);
    await worker.terminate();
    return res.json({ text });
  } catch (error) {
    await worker.terminate();
    return res.status(500).json({ error: (error as Error).message });
  }
};