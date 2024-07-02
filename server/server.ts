import app from "./app";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "./utils/db";
dotenv.config();

const PORT = Number(process.env.PORT) || 8000;
const HOST = "0.0.0.0";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  connectDB();
});
