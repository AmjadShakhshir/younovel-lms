import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

import coursesService from "../../services/coursesService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

const getCourseFromCache = async (courseIdObject: mongoose.Types.ObjectId) => {
  const courseId = courseIdObject.toString();
  const cachedCourse = "";
  return cachedCourse ? JSON.parse(cachedCourse) : null;
};

const getCourseFromService = async (courseId: mongoose.Types.ObjectId) => {
  const course = await coursesService.getSingleCourseBeforePurchase(courseId);
  return course;
};

const sendResponse = (res: Response, status: number, success: boolean, course: any, message?: string) => () =>
  res.status(status).json({
    success,
    course,
    message,
  });

/*
@ Desc     Get course
@ Route    GET /api/v1/courses/:id
@ Access   Public
*/
export const getCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = new mongoose.Types.ObjectId(req.params.id);
    let course = await getCourseFromCache(courseId);

    if (!course) {
      course = await getCourseFromService(courseId);
      if (!course) {
        return sendResponse(res, 404, false, null, "Course not found")();
      }
    }

    sendResponse(res, 200, true, course)();
  },
  { message: "Cannot get course" }
);
