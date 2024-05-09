import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";

import sendEmail from "../../utils/sendEmail";
import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import ordersService from "../../services/ordersService";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";
import coursesService from "../../services/coursesService";
import notificationService from "../../services/notificationService";

const checkCoursePurchase = (user: any, courseId: mongoose.Types.ObjectId) => {
  return user?.courses?.some((course: any) => course._id.toString() === courseId.toString());
};

const validateRequestData = (req: Request, next: NextFunction) => {
  const { courseId, paymentInfo } = req.body;
  if (!courseId || !paymentInfo) {
    return next(ApiError.badRequest("Course ID and payment info are required"));
  }
};

const getUser = async (req: Request, next: NextFunction) => {
  const userEmail = req.user?.email;
  if (!userEmail) {
    return next(ApiError.badRequest("User email is required"));
  }
  return await usersService.findByEmail(userEmail);
};

const createOrderData = async (req: Request, courseId: mongoose.Types.ObjectId, next: NextFunction) => {
  const user = await getUser(req, next);
  const courseData = await coursesService.getCourseById(courseId);

  return {
    orderData: {
      courseId: courseData?._id,
      userId: user?._id,
      paymentInfo: req.body.paymentInfo,
    },
    user,
    courseData,
  };
};

const sendOrderConfirmationEmail = async (user: any, orderCofirmationMailData: any, next: NextFunction) => {
  try {
    if (user) {
      await sendEmail({
        email: user.email,
        subject: "Order Confirmation",
        template: "order-confirmation.ejs",
        data: orderCofirmationMailData,
      });
    }
  } catch (error: any) {
    return next(ApiError.badRequest(error.message));
  }
};

const updateCoursePurchased = async (courseData: any, next: NextFunction) => {
  try {
    courseData.purchased ? (courseData.purchased += 1) : courseData.purchased;
    await coursesService.editCourse(courseData?._id, courseData);
  } catch (error: any) {
    return next(ApiError.badRequest(error.message));
  }
};
const updateUserCourses = async (user: any, courseId: mongoose.Types.ObjectId, next: NextFunction) => {
  try {
    user?.courses.push(courseId);
    await usersService.updateUser(user?._id, user);
  } catch (error: any) {
    return next(ApiError.badRequest(error.message));
  }
};

/*
@ Desc     Create new order
@ Route    POST /api/v1/orders/create-order
@ Access   Private
*/
export const createOrder = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    validateRequestData(req, next);

    const { courseId } = req.body;
    const { orderData, user, courseData } = await createOrderData(req, courseId, next);

    const courseExist = checkCoursePurchase(user, courseId);
    if (courseExist) {
      return next(ApiError.forbidden("You have purchased this course"));
    }

    await ordersService.createNewOrder(orderData);

    const orderCofirmationMailData = {
      order: {
        _id: courseData?._id.toString().slice(0, 6),
        name: courseData?.title,
        price: courseData?.price,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      },
    };

    const html = ejs.renderFile(path.join(__dirname, "../../mails/order-confirmation.ejs"), { order: orderCofirmationMailData });

    await sendOrderConfirmationEmail(user, orderCofirmationMailData, next);
    await updateUserCourses(user, courseId, next);
    await updateCoursePurchased(courseData, next);
    await notificationService.createNewNotification({
      userId: user?._id,
      title: "Order Placed",
      message: `You have placed an order for ${courseData?.title}`,
    });

    res.status(200).json({
      success: true,
      order: orderData,
      message: "Order placed successfully",
    });
  }),
  { message: "Something went wrong while creating order. Please try again." }
);
