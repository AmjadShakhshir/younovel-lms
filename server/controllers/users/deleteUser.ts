import { Request, Response } from "express";

import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import usersService from "../../services/usersService";
import { redis } from "../../utils/redis";
import mongoose from "mongoose";
/* 
@ Desc     Delete a user
@ Route    DELETE /api/v1/users/delete-user
@ Access   Private/Admin
*/
export const deleteUser = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = new mongoose.Types.ObjectId(id);
    await usersService.deleteUser(userId);
    await redis.del(id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  }),
  { message: "Something went wrong while deleting user. Please try again." }
);
