import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import usersService from "../../services/usersService";

/*
@ Desc     Get user
@ Route    GET /api/v1/users/me
@ Access   Private
*/
export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.user?._id;
    if (!userId) {
      next(ApiError.badRequest("Invalid user"));
    }
    const user = await usersService.findById(userId);
    if (!user) {
      next(ApiError.resourceNotFound("User not found"));
    }
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    next(ApiError.internal("Something went wrong while getting user"));
  }
});
