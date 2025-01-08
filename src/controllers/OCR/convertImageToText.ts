import { Request, Response } from "express";
import { createWorker } from "tesseract.js";

export const convertImageToText = async (req: Request, res: Response) => {
  const worker = await createWorker("vie");
  const ret = await worker.recognize(
    "https://r2.easyimg.io/3d8d256av/b5d180b998a936f76fb8.jpg"
  );
  await worker.terminate();
  //console.table(ret.data.lines);
  return res.json(ret.data.text);
};
