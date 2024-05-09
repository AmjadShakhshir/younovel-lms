import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import usersService from "../../services/usersService";
import { UpdateUser } from "../../types/User";
import { redis } from "../../utils/redis";

const isValidUser = ({ name, email }: UpdateUser) => name || email;
const isUniqueEmail = async (email: string) => !(await usersService.findByEmail(email));
const isUniqueName = async (name: string) => !(await usersService.findByName(name));
const sendResponse = (res: Response, status: number, message: string) => () => res.status(status).json({ success: true, message });

/*
@ Desc     Update user
@ Route    PUT /api/v1/users/update-user
@ Access   Private
*/
export const updatedUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body as UpdateUser;
    const userId = req.user?._id;

    if (!isValidUser({ name, email })) {
      return next(ApiError.badRequest("Name or email are required"));
    }

    if (!(await isUniqueEmail(email as string))) {
      return next(ApiError.badRequest("Email already exists"));
    }

    if (!(await isUniqueName(name as string))) {
      return next(ApiError.badRequest("Name already exists"));
    }

    const updatedUser = await usersService.updateUser(userId, { name, email });

    if (!updatedUser) {
      return next(ApiError.badRequest("User not found"));
    }

    await redis.set(userId, JSON.stringify(updatedUser));

    sendResponse(res, 200, "User updated successfully")();
  } catch (error: any) {
    next(ApiError.internal("Something went wrong while updating user"));
  }
});
