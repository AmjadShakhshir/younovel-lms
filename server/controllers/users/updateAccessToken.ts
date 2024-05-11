import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "dotenv";
env.config();

import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";
import { redis } from "../../utils/redis";
import { accessTokenOptions, refreshTokenOptions } from "../../utils/tokenOptions";

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

    const session = await redis.get(decoded.id as string);
    if (!session) {
      return next(ApiError.forbidden("Please login to access this resources!"));
    }
    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, { expiresIn: "5m" });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, { expiresIn: "3d" });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    await redis.set(user._id, JSON.stringify(user), "EX", 60 * 60 * 24 * 7);

    res.status(200).json({
      success: true,
      accessToken,
    });
  },
  { message: "Something went wrong while updating access token. Please try again." }
);
