import { NextFunction, Response, Request } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";
import { sendTokenToUser } from "../../utils/manageTokens";
import { ApiError } from "../../middlewares/errors/ApiError";
import { SocialAuthBody } from "../../types/User";
import { withTryCatch } from "../../helper/withTryCatch";

/*
@ Desc     Social auth
@ Route    POST /api/v1/users/social-auth
@ Access   Public
*/
export const socialAuth = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar } = req.body as SocialAuthBody;
    const user = await usersService.findByEmail(email);
    if (!user) {
      const newUser = await usersService.socialAuthSignup({ name, email, avatar });
      sendTokenToUser(newUser, 201, res);
    } else {
      user.avatar = { public_id: "", url: avatar };
      sendTokenToUser(user, 200, res);
    }
  }),
  { message: "Something went wrong while logging in using social authentication. Please try again." }
);
