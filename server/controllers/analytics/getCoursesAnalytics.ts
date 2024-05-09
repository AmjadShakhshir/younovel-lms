import { Request, Response } from "express";
import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

import analyticsService from "../../services/analyticsService";

/* 
@Desc get courses analytics
@Route GET /api/v1/analytics/courses
@Access Private/Admin
*/
export const getCoursesAnalytics = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const coursesAnalytics = await analyticsService.getCoursesAnalytics();
    res.status(200).json({ success: true, users: coursesAnalytics });
  })
);
