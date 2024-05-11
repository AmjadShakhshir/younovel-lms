import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { redis } from "../../utils/redis";

/*
@ Desc     Logout user
@ Route    POST /api/v1/users/logout
@ Access   Private
*/
export const logout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    const userId = req.user?._id;
    await redis.del(userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  },
  { message: "Something went wrong while logging out. Please try again." }
);
