import mongoose, { Document } from "mongoose";

export interface Order extends Document {
  courseId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  paymentInfo: object;
}

export interface CreateOrderData {
  courseId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}
