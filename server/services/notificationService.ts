import mongoose from "mongoose";
import NotificationModel from "../models/NotificationModel";
import { NotificationData } from "../types/Notification";

const getAllNotifications = async () => {
  return await NotificationModel.find().sort({ createdAt: -1 });
};

const createNewNotification = async (notificationData: NotificationData) => {
  return await NotificationModel.create(notificationData);
};

const updateNotification = async (id: string) => {
  const notificationId = new mongoose.Types.ObjectId(id);
  return await NotificationModel.findByIdAndUpdate(notificationId, { status: "read" }, { new: true });
};

const deleteNotification = async (thirtyDaysAgo: Date) => {
  return await NotificationModel.deleteMany({ status: "read", createdAt: { $lt: thirtyDaysAgo } });
};

export default {
  createNewNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
};
