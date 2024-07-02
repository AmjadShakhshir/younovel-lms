import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import coursesService from "../../services/coursesService";
import { ApiError } from "../../middlewares/errors/ApiError";

const uploadThumbnail = async (thumbnail: string) => {
  const result = await cloudinary.v2.uploader.upload(thumbnail, {
    folder: "courses",
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

const destroyThumbnail = async (public_id: string) => {
  await cloudinary.v2.uploader.destroy(public_id);
};

const sendResponse = (res: Response, status: number, course: any) => () =>
  res.status(status).json({
    success: true,
    course,
  });

/*
@ Desc     Update course
@ Route    PUT /api/v1/courses/:id
@ Access   Private/Admin
*/
export const updateCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseData = req.body;
    if (!courseData) {
      return next(ApiError.badRequest("You need to provide course data to update course"));
    }
    const courseId = new mongoose.Types.ObjectId(req.params.id);
    const thumbnail = courseData.thumbnail;
    if (thumbnail) {
      await destroyThumbnail(thumbnail.public_id);
      courseData.thumbnail = await uploadThumbnail(thumbnail);
    }

    const course = await coursesService.editCourse(courseId, courseData);
    if (!course) {
      return next(ApiError.resourceNotFound("Course not found"));
    }
    sendResponse(res, 201, course)();
  },
  { message: "Something went wrong while updating course. Please try again." }
);
