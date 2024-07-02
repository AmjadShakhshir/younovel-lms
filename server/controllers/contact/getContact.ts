import { NextFunction, Request, Response } from "express";

import contactService from "../../services/contactService";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import { ApiError } from "../../middlewares/errors/ApiError";

/*
@ Desc     Get contact
@ Route    GET /api/v1/contact/:id
@ Access   Private/Admin
*/
export const getContact = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as any;
    if (!id) {
      next(ApiError.badRequest("Invalid contact"));
    }
    const contact = await contactService.findById(id);
    if (!contact) {
      next(ApiError.resourceNotFound("contact not found"));
    }
    res.status(201).json({
      success: true,
      contact,
    });
  },
  { message: "Something went wrong while fetching contact. Please try again." }
);
