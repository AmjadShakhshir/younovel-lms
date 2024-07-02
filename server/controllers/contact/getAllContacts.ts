import { Request, Response } from "express";

import contactService from "../../services/contactService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

/*
@ Desc     Get all contact
@ Route    GET /api/v1/contact
@ Access   Private/Admin
*/
export const getAllContact = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const contact = await contactService.findAll();
    res.status(200).json({ success: true, contact });
  },
  { message: "Something went wrong while fetching contact. Please try again." }
);
