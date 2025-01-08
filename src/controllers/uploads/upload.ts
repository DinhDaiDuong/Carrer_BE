import { Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { TRequest, TResponse } from "../../utils/types/meta";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { IImage } from "../../utils/interfaces/Image";

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});
export const upload = async (
  req: TRequest<{ folderName: string }>,
  res: Response<TResponse<IImage>>
) => {
  try {
    console.log("body", req.file);
    if (!req.file) {
      return {
        code: 200,
        message: "Success!",
        data: {
          key: null,
          url: null,
        },
      };
    }
    const { folderName } = req.body;
    const imageBase64 = req.file?.buffer?.toString("base64");

    const dataURL = `data:${req.file?.mimetype};base64,${imageBase64}`;

    //const newPhoto =
    //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(dataURL, {
        folder: folderName || "public",
        access_mode: "authenticated",
      })
      .catch((error) => {
        console.log("error", error);
      });

    //await cloudinary.uploader.destroy("exam/wukgkqydbsptw9xxe62g");

    // const privateURL = await cloudinary.url("exam/wukgkqydbsptw9xxe62g", {
    //   transformation: [
    //     {
    //       fetch_format: "auto",
    //     },
    //   ],
    // });

    // console.log("private url", privateURL);

    console.log("upload result", uploadResult);
    const result = uploadResult as UploadApiResponse;

    return res.send({
      code: 200,
      message: "Success!",
      data: {
        key: result.public_id,
        url: result.secure_url,
      },
    });
  } catch (error) {
    console.log("e >>>", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
