import jwt, { Secret } from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { ActivationToken, User } from "../types/User";
import { accessTokenOptions, refreshTokenOptions } from "./tokenOptions";

export const createActivationToken = (user: any): ActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

export const sendTokenToUser = (user: User, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
