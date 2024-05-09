import express from "express";

import { getAllNotifications } from "../controllers/notifications/getAllNotifications";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { updateNotification } from "../controllers/notifications/updateNotification";

const notificationRouter = express.Router();

notificationRouter.get("/all-notifications", isAuthenticated, authorizeRoles("admin"), getAllNotifications);
notificationRouter.put("/update-notification/:id", isAuthenticated, authorizeRoles("admin"), updateNotification);

export default notificationRouter;
