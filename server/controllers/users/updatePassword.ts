import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import usersService from "../../services/usersService";
import { UpdatePassword } from "../../types/User";

const isValidPassword = ({ oldPassword, newPassword }: UpdatePassword) => oldPassword && newPassword;
const sendResponse = (res: Response, status: number, message: string) => () => res.status(status).json({ success: true, message });

/*
@ Desc     Update password
@ Route    PUT /api/v1/users/update-password
@ Access   Private
*/
export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body as UpdatePassword;
    const userId = req.user?._id;

    if (!isValidPassword({ oldPassword, newPassword })) {
      return next(ApiError.badRequest("Old password and new password are required"));
    }

    const updatedPassword = await usersService.updatePassword(userId, oldPassword, newPassword);

    if (!updatedPassword) {
      return next(ApiError.resourceNotFound("User not found"));
    }

    sendResponse(res, 200, "Password updated successfully")();
  },
  { message: "Something went wrong while updating password. Please try again." }
);
