import OrderRepo from "../models/OrderModel";
import { CreateOrderData } from "../types/Order";

const getAllOrders = async () => {
  return await OrderRepo.find().sort({ createdAt: -1 });
};

const createNewOrder = async (orderData: CreateOrderData) => {
  return await OrderRepo.create(orderData);
};

export default {
  createNewOrder,
  getAllOrders,
};
