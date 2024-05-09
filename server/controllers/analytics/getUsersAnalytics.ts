import { Request, Response } from "express";
import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

import analyticsService from "../../services/analyticsService";

/* 
@Desc get users analytics
@Route GET /api/v1/analytics/users
@Access Private/Admin
*/
export const getUsersAnalytics = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const usersAnalytics = await analyticsService.getUsersAnalytics();
    res.status(200).json({ success: true, users: usersAnalytics });
  })
);
