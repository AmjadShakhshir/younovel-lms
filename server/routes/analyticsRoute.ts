import express from "express";
import { getUsersAnalytics } from "../controllers/analytics/getUsersAnalytics";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { getCoursesAnalytics } from "../controllers/analytics/getCoursesAnalytics";
import { getOrdersAnalytics } from "../controllers/analytics/getOrdersAnalytics";

const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics", isAuthenticated, authorizeRoles("admin"), getUsersAnalytics);
analyticsRouter.get("/get-courses-analytics", isAuthenticated, authorizeRoles("admin"), getCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics", isAuthenticated, authorizeRoles("admin"), getOrdersAnalytics);

export default analyticsRouter;
