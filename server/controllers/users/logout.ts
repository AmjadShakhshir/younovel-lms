import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { redis } from "../../utils/redis";
import { ApiError } from "../../middlewares/errors/ApiError";

/*
@ Desc     Logout user
@ Route    POST /api/v1/users/logout
@ Access   Private
*/
export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    const userId = req.user?._id;
    await redis.del(userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    next(ApiError.internal("Something went wrong while logging out"));
  }
});
