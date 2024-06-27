import { Request, Response } from "express";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import analyticsService from "../../services/analyticsService";

/* 
@Desc get users analytics
@Route GET /api/v1/analytics/users
@Access Private/Admin
*/
export const getUsersAnalytics = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const usersAnalytics = await analyticsService.getUsersAnalytics();
    res.status(200).json({ success: true, users: usersAnalytics });
  },
  { message: "Something went wrong while fetching users analytics. Please try again." }
);
