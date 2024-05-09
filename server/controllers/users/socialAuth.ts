import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";
import { sendTokenToUser } from "../../utils/manageTokens";
import { ApiError } from "../../middlewares/errors/ApiError";
import { SocialAuthBody } from "../../types/User";

/*
@ Desc     Social auth
@ Route    POST /api/v1/users/social-auth
@ Access   Public
*/
export const socialAuth = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, avatar } = req.body as SocialAuthBody;
    const user = await usersService.findByEmail(email);
    if (!user) {
      const newUser = await usersService.socialAuthSignup({ name, email, avatar });
      sendTokenToUser(newUser, 201, res);
    }
    next(ApiError.badRequest("User already exists"));
  } catch (error: any) {
    next(ApiError.internal("Something went wrong while authenticating user"));
  }
});
