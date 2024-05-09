import mongoose, { Model, Schema } from "mongoose";

import { Order } from "../types/Order";

const orderSchema = new Schema<Order>(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentInfo: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel: Model<Order> = mongoose.model("Order", orderSchema);

export default OrderModel;
