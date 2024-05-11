import { Request, Response } from "express";
import mongoose from "mongoose";

import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import coursesService from "../../services/coursesService";
import { redis } from "../../utils/redis";

export const deleteCourse = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const courseId = new mongoose.Types.ObjectId(id);
    await coursesService.deleteCourse(courseId);
    await redis.del(id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  },
  { message: "Something went wrong while deleting course. Please try again." }
);
