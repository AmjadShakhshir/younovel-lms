import { Response, Request } from "express";
import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import notificationService from "../../services/notificationService";

/*
@ Desc     Get all notifications
@ Route    GET /api/v1/notifications/all-notifications
@ Access   Private/Admin
*/
export const getAllNotifications = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const notifications = await notificationService.getAllNotifications();
    return res.status(200).json({ success: true, notifications });
  },
  { message: "Something went wrong while fetching notifications. Please try again." }
);
