import mongoose, { Document } from "mongoose";

export interface Video extends Document {
  title: string;
  description: string;
  url: string;
  courseId: mongoose.Types.ObjectId;
}
