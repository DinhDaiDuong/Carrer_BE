import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// need to adjust this with api upload file excel
const storageImage = multer.memoryStorage();
const upload = multer({ storage });
const uploadImages = multer({ storage: storageImage });
export { uploadImages };
export default upload;
