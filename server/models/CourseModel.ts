import mongoose, { Model, Schema } from "mongoose";
import { Review, Link, Comment, Course } from "../types/Course";

const reviewSchema = new Schema<Review>(
  {
    userId: mongoose.Schema.Types.ObjectId,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  {
    timestamps: true,
  }
);

const linkSchema = new Schema<Link>({
  title: String,
  url: String,
});

const commentSchema = new Schema<Comment>({
  userId: mongoose.Schema.Types.ObjectId,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new Schema({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<Course>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel: Model<Course> = mongoose.model("Course", courseSchema);

export default CourseModel;
