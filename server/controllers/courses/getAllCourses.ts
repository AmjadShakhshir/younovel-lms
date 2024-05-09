import { Request, Response } from "express";

import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import coursesService from "../../services/coursesService";

/* 
    GET /api/v1/courses
    @private route
    @Role admin
*/
export const getAllCourses = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const courses = await coursesService.getAllCourses();
    res.status(200).json({ success: true, courses });
  })
);
