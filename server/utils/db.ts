import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL).then((data: any) => {
      console.log(`MongoDB Connected: ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

export default connectDB;
