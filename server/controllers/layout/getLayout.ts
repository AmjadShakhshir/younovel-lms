import { NextFunction, Request, Response } from "express";

import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import layoutService from "../../services/layoutService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const layoutType = req.body.type;
    const layout = await layoutService.findOne(layoutType);
    if (!layout) {
      return next(ApiError.badRequest("Layout not found"));
    }
    res.status(200).json({
      success: true,
      layout,
    });
  },
  { message: "Something went wrong while fetching layout. Please try again." }
);
