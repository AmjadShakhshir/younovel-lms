import { NextFunction, Response, Request } from "express";

import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import coursesService from "../../services/coursesService";
import { withTryCatch } from "../../helper/withTryCatch";
import mongoose, { mongo } from "mongoose";

// refactor it using FP and composability
/*
@ Desc     Get course content for purchased user
@ Route    GET /api/v1/courses/:id/content
@ Access   Private
*/
export const getCourseContentForPurchasedUser = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses;
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId);

    if (!courseExists) {
      return next(ApiError.forbidden("You have not purchased this course"));
    }

    const course = await coursesService.getCourseById(courseId);
    const courseContent = course?.courseData;

    res.status(200).json({
      success: true,
      content: courseContent,
    });
  })
);
