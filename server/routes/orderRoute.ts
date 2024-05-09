import express from "express";

import { createOrder } from "../controllers/orders/createOrder";
import { authorizeRoles, isAuthenticated } from "../middlewares/checkAuth";
import { getAllOrders } from "../controllers/orders/getAllOrders";

const orderRouter = express.Router();

orderRouter.get("/all-orders", isAuthenticated, authorizeRoles("admin"), getAllOrders);
orderRouter.post("/create-order", isAuthenticated, createOrder);

export default orderRouter;
