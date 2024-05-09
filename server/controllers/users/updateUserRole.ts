import { Request, Response } from "express";

import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";

/*
@ Desc     Update user role
@ Route    PUT /api/v1/users/update-user-role
@ Access   Private/Admin
*/
export const updateUserRole = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const { userId, role } = req.body;
    const user = await usersService.updateUserRole(userId, role);
    res.status(200).json({ success: true, user });
  })
);
