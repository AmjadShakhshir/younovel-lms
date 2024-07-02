import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import { AddQuestionData } from "../../types/Course";
import coursesService from "../../services/coursesService";
import notificationService from "../../services/notificationService";

const isValidContentId = (contentId: string) => mongoose.Types.ObjectId.isValid(contentId);

const findCourseContent = (course: any, contentId: string) => course?.courseData.find((content: any) => content._id.equals(contentId));

const createNewQuestion = (user: any, question: string) => ({
  userId: user._id,
  question,
  questionReplies: [],
});

/*
@ Desc     Add new question
@ Route    PUT /api/v1/courses/add-question
@ Access   Private
*/
export const addQuestion = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { question, courseId, contentId }: AddQuestionData = req.body;
    const courseIdObject = new mongoose.Types.ObjectId(courseId);
    const course = await coursesService.getCourseById(courseIdObject);

    if (!isValidContentId(contentId)) {
      return next(ApiError.badRequest("Invalid content id"));
    }

    const courseContent = findCourseContent(course, contentId);

    if (!courseContent) {
      return next(ApiError.badRequest("Content not found"));
    }

    const newQuestion = createNewQuestion(req.user, question);

    await coursesService.createNewQuestionQuery(course, courseContent, newQuestion);
    await notificationService.createNewNotification({
      userId: req.user?._id,
      title: `New question on ${course?.title} Received`,
      message: `You have a new question on ${courseContent?.title}`,
    });

    res.status(200).json({
      success: true,
      course,
    });
  },
  { message: "Something went wrong while adding question. Please try again." }
);
