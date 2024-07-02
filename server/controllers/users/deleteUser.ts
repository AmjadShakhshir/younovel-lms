import { Request, Response } from "express";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import usersService from "../../services/usersService";
import mongoose from "mongoose";
/* 
@ Desc     Delete a user
@ Route    DELETE /api/v1/users/delete-user
@ Access   Private/Admin
*/
export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response) => {
    console.log("Delete user");
    const id = req.params.id;
    const userId = new mongoose.Types.ObjectId(id);
    console.log("userId", userId);
    await usersService.deleteUser(userId);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  },
  { message: "Something went wrong while deleting user. Please try again." }
);
