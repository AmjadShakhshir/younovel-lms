import mongoose, { Document } from "mongoose";

export interface Notification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  status: string;
}

export interface NotificationData {
  userId: string;
  title: string;
  message: string;
}
