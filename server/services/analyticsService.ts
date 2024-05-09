import userModel from "../models/UserModel";
import courseModel from "../models/CourseModel";
import orderModel from "../models/OrderModel";
import { generateLast12MonthData } from "../utils/analyticsGenerator";

const getUsersAnalytics = async () => {
  return await generateLast12MonthData(userModel);
};

const getCoursesAnalytics = async () => {
  return await generateLast12MonthData(courseModel);
};

const getOrdersAnalytics = async () => {
  return await generateLast12MonthData(orderModel);
};

export default {
  getUsersAnalytics,
  getCoursesAnalytics,
  getOrdersAnalytics,
};
