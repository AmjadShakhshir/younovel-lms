import { Request, Response } from "express";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import contactService from "../../services/contactService";
import mongoose from "mongoose";
/* 
@ Desc     Delete a contact
@ Route    DELETE /api/v1/contact
@ Access   Private/Admin
*/
export const deleteContact = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const contactId = new mongoose.Types.ObjectId(id);
    await contactService.deleteContact(contactId);
    res.status(200).json({ success: true, message: "contact deleted successfully" });
  },
  { message: "Something went wrong while deleting contact. Please try again." }
);
