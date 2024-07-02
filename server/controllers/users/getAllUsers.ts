import { Response, Request } from "express";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import usersService from "../../services/usersService";

/*
@ Desc     Get all users
@ Route    GET /api/v1/users/all-users
@ Access   Private/Admin
*/
export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const users = await usersService.findAll();
    res.status(200).json({ success: true, users });
  },
  { message: "Something went wrong while fetching users. Please try again." }
);
