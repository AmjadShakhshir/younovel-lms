import mongoose, { Model, Schema } from "mongoose";

import { Notification } from "../types/Notification";

const NotificationSchema = new Schema<Notification>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unread",
    },
  },
  { timestamps: true }
);

const NotificationModel: Model<Notification> = mongoose.model("Notification", NotificationSchema);

export default NotificationModel;
