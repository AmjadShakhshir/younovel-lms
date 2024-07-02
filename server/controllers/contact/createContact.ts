import { Request, Response } from "express";

import contactService from "../../services/contactService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";

/*
@ Desc     Register contact
@ Route    Post /api/v1/contact
@ Access   Private/contact
*/
export const createContact = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const newContact = await contactService.create(req.body);
    res.status(201).json({ success: true, newContact });
  },
  { message: "Something went wrong while create contact. Please try again." }
);
