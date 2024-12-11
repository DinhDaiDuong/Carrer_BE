import mongoose from "mongoose";

const URI =
  "mongodb+srv://phuongtien:phuongtienn@cluster0.4tbfypg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDb = async () => {
  try {
    await mongoose.connect(URI, { dbName: "Career_App" });
    console.log("db connected...");
  } catch (e) {
    console.log(e);
  }
};

export { connectToDb };
