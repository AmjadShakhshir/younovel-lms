import { Request, Response } from "express";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import coursesService from "../../services/coursesService";

/* 
    GET /api/v1/courses
    @private route
    @Role admin
*/
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const courses = await coursesService.getAllCourses();
    res.status(200).json({ success: true, courses });
  },
  { message: "Something went wrong while fetching courses. Please try again." }
);
