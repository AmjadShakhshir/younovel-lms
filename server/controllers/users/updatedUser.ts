import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import usersService from "../../services/usersService";
import { UpdateUser } from "../../types/User";
import mongoose from "mongoose";

const isValidUser = ({ name, position, description, qualification }: UpdateUser) => name || position || description || qualification;
const isUniqueName = async (name: string) => !(await usersService.findByName(name));
const sendResponse = (res: Response, status: number, message: string) => () => res.status(status).json({ success: true, message });

/*
@ Desc     Update user
@ Route    PUT /api/v1/users/update
@ Access   Private
*/
export const updatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, position, description, qualification } = req.body as UpdateUser;

    const userId = req.user?.id as unknown as mongoose.Types.ObjectId;

    if (!isValidUser({ name, position, description, qualification })) {
      return next(ApiError.badRequest("Name, Position, Description or Qualification are required"));
    }

    if (!(await isUniqueName(name as string))) {
      return next(ApiError.badRequest("Name already exists"));
    }

    const updatedUser = await usersService.updateUser(userId, req.body as UpdateUser);

    if (!updatedUser) {
      return next(ApiError.badRequest("User not found"));
    }

    sendResponse(res, 200, "User updated successfully")();
  },
  { message: "Something went wrong while updating user. Please try again." }
);
