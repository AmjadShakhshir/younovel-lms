import { Request, Response } from "express";
import mongoose from "mongoose";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import coursesService from "../../services/coursesService";

export const deleteCourse = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const courseId = new mongoose.Types.ObjectId(id);
    await coursesService.deleteCourse(courseId);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  },
  { message: "Something went wrong while deleting course. Please try again." }
);
