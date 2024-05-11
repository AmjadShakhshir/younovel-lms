import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import coursesService from "../../services/coursesService";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendEmail from "../../utils/sendEmail";
import usersService from "../../services/usersService";
import notificationService from "../../services/notificationService";

const isValidContentId = (contentId: string) => mongoose.Types.ObjectId.isValid(contentId);

const findCourseContent = (course: any, contentId: string) => course?.courseData.find((content: any) => content._id.equals(contentId));

const findQuestion = (courseContent: any, questionId: string) => courseContent?.questions.find((question: any) => question._id.equals(questionId));

const createNewAnswer = (user: any, answer: string) => ({
  userId: user._id,
  answer,
});

/*
@Desc     Add new answer
@Route    PUT /api/v1/courses/add-answer
@Access   Private
*/
export const addAnswer = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { answer, courseId, contentId, questionId } = req.body;

    const course = await coursesService.getCourseById(courseId);

    if (!isValidContentId(contentId)) {
      return next(ApiError.badRequest("Invalid content id"));
    }

    const courseContent = findCourseContent(course, contentId);

    if (!courseContent) {
      return next(ApiError.badRequest("Content not found"));
    }

    const questionContent = findQuestion(courseContent, questionId);

    const questionOwnerAsString = await usersService.findById(questionContent.userId);
    const questionOwnerObject = JSON.parse(questionOwnerAsString as string);

    if (!questionContent) {
      return next(ApiError.badRequest("Question not found"));
    }

    const newAnswer = createNewAnswer(req.user, answer);

    await coursesService.createNewAnswerQuery(course, questionContent, newAnswer);

    if (req.user?._id === questionContent.userId) {
      await notificationService.createNewNotification({
        userId: req.user?._id,
        title: `New question Reply on ${course?.title} Received`,
        message: `You have a new question reply on ${courseContent?.title}`,
      });
    } else {
      const notificationData = {
        name: questionOwnerObject.name,
        title: courseContent.title,
      };

      const html = await ejs.renderFile(path.join(__dirname, "../../mails/question-reply.ejs"), notificationData);

      try {
        await sendEmail({
          email: questionOwnerObject.email,
          subject: "Question Reply",
          template: "question-reply.ejs",
          data: notificationData,
        });
      } catch (error: any) {
        next(ApiError.internal(error.message));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
  },
  { message: "Something went wrong while adding answer. Please try again." }
);
