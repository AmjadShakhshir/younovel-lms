import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { AddReviewReplyData } from "../../types/Course";
import coursesService from "../../services/coursesService";
import { ApiError } from "../../middlewares/errors/ApiError";

const findReviewById = (reviews: any[], reviewId: mongoose.Types.ObjectId) => reviews.find((review) => review._id.toString() === reviewId);

/*
@ Desc     Add reply to review
@ Route    PUT /api/v1/courses/add-reply
@ Access   Private
*/
export const addReplyToReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId, courseId, comment } = req.body as AddReviewReplyData;

    const course = await coursesService.getCourseById(courseId);

    if (!course) {
      return next(ApiError.badRequest("Course not found"));
    }

    const review = findReviewById(course.reviews, reviewId);

    if (!review) {
      return next(ApiError.badRequest("Review not found"));
    }

    const replyData: any = {
      userId: req.user?._id,
      comment,
    };

    await coursesService.addReplyToReview(review, replyData, course);

    res.status(200).json({
      success: true,
      course,
    });
  },
  { message: "Something went wrong while adding reply to review. Please try again." }
);
