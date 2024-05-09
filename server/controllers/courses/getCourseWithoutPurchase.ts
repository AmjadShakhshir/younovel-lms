import { NextFunction, Response, Request } from "express";
import coursesService from "../../services/coursesService";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { redis } from "../../utils/redis";
import { withTryCatch } from "../../helper/withTryCatch";
import mongoose from "mongoose";

const getCourseFromCache = async (courseIdObject: mongoose.Types.ObjectId) => {
  const courseId = courseIdObject.toString();
  const cachedCourse = await redis.get(courseId);
  return cachedCourse ? JSON.parse(cachedCourse) : null;
};

const getCourseFromService = async (courseId: mongoose.Types.ObjectId) => {
  const course = await coursesService.getSingleCourseBeforePurchase(courseId);
  return course;
};

const cacheCourse = async (courseIdObject: mongoose.Types.ObjectId, course: any) => {
  const courseId = courseIdObject.toString();
  await redis.set(courseId, JSON.stringify(course), "EX", 60 * 60 * 24 * 7);
  return course;
};

const sendResponse = (res: Response, status: number, success: boolean, course: any, message?: string) => () =>
  res.status(status).json({
    success,
    course,
    message,
  });

/*
@ Desc     Get course without purchase
@ Route    GET /api/v1/courses/:id
@ Access   Public
*/
export const getCourseWithoutPurchase = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const courseId = new mongoose.Types.ObjectId(req.params.id);
    let course = await getCourseFromCache(courseId);

    if (!course) {
      course = await getCourseFromService(courseId);
      if (!course) {
        return sendResponse(res, 404, false, null, "Course not found")();
      }
      course = await cacheCourse(courseId, course);
    }

    sendResponse(res, 200, true, course)();
  })
);
