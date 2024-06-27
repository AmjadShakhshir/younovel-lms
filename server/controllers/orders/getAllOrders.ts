import { Request, Response } from "express";

import { catchAsyncErrors } from "../../utils/catchAsyncErrors";
import ordersService from "../../services/ordersService";

/*
@ Desc     Get all orders
@ Route    GET /api/v1/orders/all-orders
@ Access   Private/Admin
*/
export const getAllOrders = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const orders = await ordersService.getAllOrders();
    res.status(200).json({ success: true, orders });
  },
  { message: "Something went wrong while fetching orders. Please try again." }
);
