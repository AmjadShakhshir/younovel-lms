import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { ApiError } from "./errors/ApiError";

const decodingAccessToken = async (access_token: string, next: NextFunction) => {
  try {
    const decodeTokenUsingJWT = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    return decodeTokenUsingJWT;
  } catch (error) {
    return next(ApiError.forbidden("Invalid token or unauthorized access"));
  }
};

export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(ApiError.forbidden("You need to login to access this resource"));
    }

    const decoded = await decodingAccessToken(access_token, next);
    if (!decoded) {
      return next(ApiError.forbidden("Please login to access this resource"));
    }

    req.user = decoded;
    next();
  },
  { message: "Something went wrong while verifying user" }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(ApiError.forbidden(`Role: ${req.user?.role} not authorized to access this resource`));
    }
    next();
  };
};
