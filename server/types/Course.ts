import mongoose, { Document } from "mongoose";

export interface Comment extends Document {
  userId: mongoose.Types.ObjectId;
  question: string;
  questionReplies?: Comment[];
}

export interface Link {
  title: string;
  url: string;
}

export interface Review extends Document {
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  commentReplies?: Comment[];
}

export interface CourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: Link[];
  suggestion: string;
  questions: Comment[];
}

export interface Course extends Document {
  title: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: Review[];
  courseData: CourseData[];
  ratings?: number;
  purchased?: number;
}

export interface CourseUpdate {
  title?: string;
  description?: string;
  price?: number;
  estimatedPrice?: number;
  thumbnail?: object;
  tags?: string;
  level?: string;
  demoUrl?: string;
  benefits?: { title: string }[];
  prerequisites?: { title: string }[];
  reviews?: Review[];
  courseData?: CourseData[];
  ratings?: number;
  purchased?: number;
}

export interface AddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export interface AddAnswerData {
  answer: string;
  courseId: mongoose.Types.ObjectId;
  contentId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
}

export interface AddReviewData {
  rating: number;
  review: string;
  userId: mongoose.Types.ObjectId;
}

export interface AddReviewReplyData {
  comment: string;
  courseId: mongoose.Types.ObjectId;
  reviewId: mongoose.Types.ObjectId;
}
