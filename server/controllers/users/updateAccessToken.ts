import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "dotenv";
env.config();

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import { accessTokenOptions, refreshTokenOptions } from "../../utils/tokenOptions";
import usersService from "../../services/usersService";
import mongoose, { mongo } from "mongoose";

/*
@ Desc     Update access token
@ Route    POST /api/v1/users/update-access-token
@ Access   Private
*/
export const updateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token as string;

    if (!refresh_token) {
      return next(ApiError.forbidden("You need to login to access this resource"));
    }
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
    if (!decoded) {
      return next(ApiError.forbidden("Could not refresh token"));
    }
    const userId = decoded.id as string;

    const user = await usersService.findById(userId);

    if (!user) {
      return next(ApiError.resourceNotFound("User not found"));
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, { expiresIn: "5m" });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, { expiresIn: "3d" });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(200).json({
      success: true,
      accessToken,
    });
  },
  { message: "Something went wrong while updating access token. Please try again." }
);
