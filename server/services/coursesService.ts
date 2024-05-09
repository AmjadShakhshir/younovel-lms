import { Course, CourseUpdate } from "../types/Course";
import CourseRepo from "../models/CourseModel";
import mongoose from "mongoose";

const getAllCoursesBeforePurchase = async () => {
  return await CourseRepo.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
};

const getSingleCourseBeforePurchase = async (courseId: mongoose.Types.ObjectId) => {
  return await CourseRepo.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
};

const getCourseById = async (courseId: mongoose.Types.ObjectId) => {
  return await CourseRepo.findById(courseId);
};

const createCourse = async (courseData: Course) => {
  return await CourseRepo.create(courseData);
};

const editCourse = async (courseId: mongoose.Types.ObjectId, courseData: CourseUpdate) => {
  return await CourseRepo.findByIdAndUpdate(courseId, { $set: courseData }, { new: true });
};

const createNewQuestionQuery = async (course: any, courseContent: any, newQuestion: any) => {
  courseContent.questions.push(newQuestion);
  await course?.save();
};

const createNewAnswerQuery = async (course: any, questionContent: any, newAnswer: any) => {
  questionContent.questionReplies.push(newAnswer);
  await course?.save();
};

const createNewReviewQuery = async (course: any, reviewData: any) => {
  if (reviewData !== undefined && reviewData !== null) {
    course?.reviews.push(reviewData);
  }
  await course?.save();
};

const addReplyToReview = async (review: any, replyData: any, course: any) => {
  if (!review.commentReplies) {
    review.commentReplies = [];
  }
  review.commentReplies.push(replyData);
  await course?.save();
};

const getAllCourses = async () => {
  return await CourseRepo.find().sort({ createdAt: -1 });
};

const deleteCourse = async (courseId: mongoose.Types.ObjectId) => {
  return await CourseRepo.findByIdAndDelete(courseId);
};

export default {
  getAllCoursesBeforePurchase,
  getSingleCourseBeforePurchase,
  getCourseById,
  createCourse,
  editCourse,
  createNewQuestionQuery,
  createNewAnswerQuery,
  createNewReviewQuery,
  addReplyToReview,
  getAllCourses,
  deleteCourse,
};
