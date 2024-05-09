import { Response, Request } from "express";
import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";

/*
@ Desc     Get all users
@ Route    GET /api/v1/users/all-users
@ Access   Private/Admin
*/
export const getAllUsers = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const users = await usersService.findAll();
    res.status(200).json({ success: true, users });
  })
);
