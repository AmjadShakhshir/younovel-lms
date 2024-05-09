import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";
import { ActivationToken, RegisterationBody, User } from "../../types/User";
import { createActivationToken } from "../../utils/manageTokens";
import { emailTemplate } from "../../utils/emailTemplate";
import sendEmail from "../../utils/sendEmail";
import { ApiError } from "../../middlewares/errors/ApiError";

const createUser = async (name: string, email: string, password: string) => {
  try {
    const newUser = await usersService.signUp({ name, email, password });
    return newUser;
  } catch (error: any) {
    throw ApiError.internal(error.message);
  }
};

const prepareEmailData = (user: RegisterationBody, activationCode: string) => {
  return { user: { name: user.name }, activationCode };
};

const handleResponse = async (res: Response, email: string, token: string) => {
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
export const signup = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

const verifyToken = (token: string, activationCode: string) => {
  const newUser: { user: User; activationCode: string } = jwt.verify(token, process.env.ACTIVATION_SECRET as string) as { user: User; activationCode: string };

  if (newUser.activationCode !== activationCode) {
    throw ApiError.badRequest("Invalid activation code");
  }

  return newUser;
};

export const activateUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, activationCode } = req.body as ActivationToken;
    const newUser = verifyToken(token, activationCode);

    const { name, email, password } = newUser.user;
    const user = await createUser(name, email, password);
    if (!user) {
      throw ApiError.internal("Error creating user");
    }

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
