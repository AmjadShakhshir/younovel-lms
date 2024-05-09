import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";

import { ApiError } from "../../middlewares/errors/ApiError";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import coursesService from "../../services/coursesService";
import { withTryCatch } from "../../helper/withTryCatch";

/*
@ Desc     Upload course
@ Route    POST /api/v1/courses/create-course
@ Access   Private/Admin
*/
export const uploadCourse = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const courseData = req.body;
    const thumbnail = courseData.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      courseData.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const course = await coursesService.createCourse(courseData);
    if (!course) {
      return next(ApiError.resourceNotFound("Course not found"));
    }
    res.status(201).json({
      success: true,
      course,
    });
  })
);
