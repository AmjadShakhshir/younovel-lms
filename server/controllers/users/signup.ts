import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import usersService from "../../services/usersService";
import { ActivationToken, RegisterationBody, User } from "../../types/User";
import { createActivationToken } from "../../utils/manageTokens";
import { emailTemplate } from "../../utils/emailTemplate";
import sendEmail from "../../utils/sendEmail";
import { ApiError } from "../../middlewares/errors/ApiError";

const createUser = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const newUser = await usersService.signUp({ name, email, password });
    return newUser;
  },
  { message: "Error creating user" }
);

const prepareEmailData = (user: RegisterationBody, activationCode: string) => {
  console.log("User", user, "Activation code", activationCode);
  return { user: { name: user.name }, activationCode };
};

const handleResponse = async (res: Response, email: string, token: string) => {
  console.log(token);
  res.status(201).json({
    message: `Please check your email: ${email} for activation link`,
    success: true,
    activationToken: token,
  });
};

/*
@ Desc     Signup user
@ Route    POST /api/v1/users/signup
@ Access   Public
*/
export const signup = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const doesEmailExist = await usersService.findByEmail(email);
    if (doesEmailExist) {
      next(ApiError.badRequest("Email already exists"));
    }

    const user: RegisterationBody = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const userDataForSendingEmail = prepareEmailData(user, activationCode);
    const sendActivationEmailToUser = await emailTemplate(userDataForSendingEmail);

    try {
      await sendEmail({
        email: email,
        subject: "Account Activation",
        template: "activation-mail.ejs",
        data: userDataForSendingEmail,
      });

      await handleResponse(res, user.email, activationToken.token);
    } catch (error) {
      next(ApiError.internal("Error sending email"));
    }
  },
  { message: "Something went wrong while signing up. Please try again." }
);

const verifyToken = (token: string, activationCode: string) => {
  try {
    const newUser: { user: User; activationCode: string } = jwt.verify(token, process.env.ACTIVATION_SECRET as string) as { user: User; activationCode: string };
    if (newUser.activationCode !== activationCode) {
      throw ApiError.badRequest("Invalid activation code");
    }
    return newUser;
  } catch (error) {
    console.log("Error verifying token", error);
  }
};

export const activateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, activationCode } = req.body as ActivationToken;
    const newUser = verifyToken(token, activationCode);
    if (!newUser) {
      throw ApiError.badRequest("Invalid token");
    }
    req.body = newUser.user;
    const user = await createUser(req, res, next);
    if (!user) {
      throw ApiError.internal("Error creating user");
    }

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  },
  { message: "Something went wrong while activating user. Please try again." }
);
