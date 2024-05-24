import { Response, NextFunction } from 'express';
import { Product, Order, OrderItem } from '../models';
import { Constant, ErrorHandler, Mail, AsyncHandler, Types, Enum } from '../utils';

// Create New Order
export const createOrder = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
  const isValidBodyKey = Constant.checkValidKey(Enum.enum_new_order, req.body);

  console.log(isValidBodyKey);
});

// // Get Order Details
// export const getOrderDetails = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
//   const order = await Order.findById(req.params.id).populate('user', 'name email');

//   if (!order) {
//     return next(new ErrorHandler('Order not found', 404));
//   }

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

// export const myOrders = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
//   const orders = await Order.find({ user: req.user._id });

//   if (!orders) {
//     return next(new ErrorHandler('Order Not Found', 404));
//   }

//   res.status(200).json({
//     success: true,
//     totalOrders: orders.length,
//     orders,
//   });
// });

// // get all orders
// export const getAllOrders = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
//   const orders = await Order.find();

//   let totalAmount = 0;

//   orders.forEach((order) => {
//     totalAmount += order.totalPrice;
//   });

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     totalOrders: orders.length,
//     orders,
//   });
// });

// // Update Order Status
// export const updateOrderStatus = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
//   const order = await Order.findById(req.params.id);

//   if (order.orderStatus === 'Delivered') {
//     return next(new ErrorHandler('Product is Already Delivered.', 400));
//   }

//   order.orderItems.forEach(async (order) => {
//     await updateStock(order.product, order.quantity);
//   });

//   order.orderStatus = req.body.status;

//   if (req.body.status === 'Delivered') {
//     order.deliveredAt = Date.now();
//   }

//   await order.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Delete Orders
// export const deleteOrders = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler('Order not found with this ID', 404));
//   }

//   await order.remove();

//   res.status(200).json({
//     success: true,
//     message: 'Order Deleted Successfully!',
//   });
// });
