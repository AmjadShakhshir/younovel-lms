import { NextFunction, Response } from "express";
import coursesService from "../../services/coursesService";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import { redis } from "../../utils/redis";
import { withTryCatch } from "../../helper/withTryCatch";

const getCoursesFromCache = async () => {
  const cachedCourses = await redis.get("allCourses");
  return cachedCourses ? JSON.parse(cachedCourses) : null;
};

const getCoursesFromService = async () => {
  const courses = await coursesService.getAllCoursesBeforePurchase();
  return courses;
};

const cacheCourses = async (courses: any) => {
  await redis.set("allCourses", JSON.stringify(courses));
  return courses;
};

const sendResponse = (res: Response, status: number, success: boolean, courses: any) => () =>
  res.status(status).json({
    success,
    courses,
  });

/*
@ Desc     Get all courses
@ Route    GET /api/v1/courses/all-courses
@ Access   Private/Admin
*/
export const getAllCoursesWithoutPurchase = withTryCatch(
  catchAsyncErrors(async (_: any, res: Response, next: NextFunction) => {
    let courses = await getCoursesFromCache();

    if (!courses) {
      courses = await getCoursesFromService();
      courses = await cacheCourses(courses);
    }

    sendResponse(res, 200, true, courses)();
  })
);
