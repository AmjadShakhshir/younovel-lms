import { NextFunction, Request, Response } from "express";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import coursesService from "../../services/coursesService";
import { AddReviewData } from "../../types/Course";
import mongoose from "mongoose";

const checkCoursePurchase = (userCourseList: any[], courseId: mongoose.Types.ObjectId, next: NextFunction) => {
  const courseExists = userCourseList?.some((course: any) => course._id.toString() === courseId);
  if (!courseExists) {
    return next(ApiError.forbidden("You have not purchased this course"));
  }
};

const calculateAverageRating = (reviews: any[]) => {
  // issue that it doesn't calculate the first review
  let totalRating = 0;

  reviews.forEach((review) => {
    console.log("review", review.rating);
    totalRating += review.rating;
  });
  return totalRating / reviews.length;
};

/*
@ Desc     Add new review
@ Route    PUT /api/v1/courses/add-review/:id
@ Access   Private
*/
export const addReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses as any[];
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    checkCoursePurchase(userCourseList, courseId, next);

    const course = await coursesService.getCourseById(courseId);
    const { rating, review } = req.body as AddReviewData;

    const reviewData: any = {
      userId: req.user?._id,
      rating,
      comment: review,
    };

    if (course) {
      course.ratings = course.reviews.length === 0 ? rating : calculateAverageRating(course.reviews);
    }

    await coursesService.createNewReviewQuery(course, reviewData);

    const notificationData = {
      title: "New Review Received",
      message: `You have received a new review on your course ${course?.title}`,
    };

    res.status(200).json({
      success: true,
      course,
    });
  },
  { message: "Something went wrong while adding review. Please try again." }
);
