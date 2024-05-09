import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";
import { sendTokenToUser } from "../../utils/manageTokens";
import { LoginRequest } from "../../types/User";

/*
@ Desc     Login user
@ Route    POST /api/v1/users/login
@ Access   Public
*/
export const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as LoginRequest;
    if (!email || !password) {
      return next(ApiError.badRequest("Please provide email and password"));
    }
    const userInfo = { email, password };
    const user = await usersService.logIn(userInfo);
    if (!user) {
      return next(ApiError.badRequest("Invalid credentials"));
    }

    const isPasswordMatched = await user.comparePassword(userInfo.password);

    if (!isPasswordMatched) {
      return next(ApiError.badRequest("Invalid credentials"));
    }

    sendTokenToUser(user, 200, res);
  } catch (error) {
    next(ApiError.internal("Internal Server Error"));
  }
});
