import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";
import { User } from "../../types/User";
import mongoose from "mongoose";

const uploadAvatar = async (avatar: string) => {
  const result = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

const destroyAvatar = async (public_id: string) => {
  await cloudinary.v2.uploader.destroy(public_id);
};

const sendResponse = (res: Response, status: number, user: User) => () =>
  res.status(status).json({
    success: true,
    user,
  });

/*
@ Desc     Update profile picture
@ Route    PUT /api/v1/users/update-profile-pic
@ Access   Private
*/
export const updateProfilePic = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body;

    if (!avatar) {
      return next(ApiError.badRequest("Please upload an image"));
    }
    const userId = req.user?.id as unknown as mongoose.Types.ObjectId;

    const user = await usersService.updateAvatar(userId, avatar.avatar);

    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await destroyAvatar(user.avatar.public_id);
      }
      user.avatar = await uploadAvatar(avatar.avatar);
      await user.save();
      sendResponse(res, 200, user)();
    }
  },
  { message: "Something went wrong while updating profile picture. Please try again." }
);
