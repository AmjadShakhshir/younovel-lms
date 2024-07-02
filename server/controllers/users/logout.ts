import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

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

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  },
  { message: "Something went wrong while logging out. Please try again." }
);
