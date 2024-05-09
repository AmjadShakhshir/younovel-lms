import { NextFunction, Response, Request } from "express";
import { withTryCatch } from "../../helper/withTryCatch";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import notificationService from "../../services/notificationService";

/*
@ Desc     Update a notification
@ Route    PUT /api/v1/notifications/:id
@ Access   Private/Admin
*/
export const updateNotification = withTryCatch(
  catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await notificationService.updateNotification(id);
    const notifications = await notificationService.getAllNotifications();
    res.status(201).json({ success: true, notifications });
  }),
  { message: "Something went wrong while updating the notification. Please try again." }
);
