import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import usersService from "../../services/usersService";
import mongoose, { ObjectId } from "mongoose";

/*
@ Desc     Get user
@ Route    GET /api/v1/users/me
@ Access   Private
*/
export const getUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: mongoose.Types.ObjectId = req.user?._id;
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
  },
  { message: "Something went wrong while fetching user. Please try again." }
);
