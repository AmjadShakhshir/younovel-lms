import { Request, Response } from "express";
import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

import analyticsService from "../../services/analyticsService";

/* 
@Desc get orders analytics
@Route GET /api/v1/analytics/orders
@Access Private/Admin
*/
export const getOrdersAnalytics = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const ordersAnalytics = await analyticsService.getOrdersAnalytics();
    res.status(200).json({ success: true, users: ordersAnalytics });
  }),
  { message: "Something went wrong while fetching orders analytics. Please try again." }
);
