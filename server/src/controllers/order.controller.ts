import { Response, NextFunction } from 'express';
import { Product, Order, OrderItem } from '../models';
import { Constant, ErrorHandler, Mail, AsyncHandler, Types } from '../utils';
import mongoose from 'mongoose';

// Create New Order
export const createOrder = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const checkValidBody = Constant.checkValidKey(Constant.new_order_body, req.body);
    const { order_items } = req.body;

    console.log(checkValidBody.isValid);

    if (!checkValidBody.isValid) {
      throw new ErrorHandler(
        `Invalid key in body detected. Valid keys are: ${Constant.new_order_body.join(', ')}`,
        400
      );
    }

    if (!Constant.checkArray(order_items)) {
      throw new ErrorHandler('Please provide valid order items.', 400);
    }

    const order = await Order.create([req.body], { session });
    console.log(order);

    if (order) {
      const order_id = order[0]._id;
      const new_order_items = order_items.map((item: any) => ({ ...item, order_id }));
      const orderItems = await OrderItem.insertMany(new_order_items, { session });
      console.log(orderItems);

      if (!orderItems) {
        throw new ErrorHandler('Order items not created', 400);
      }

      await session.commitTransaction();
      return res.status(200).json({
        success: true,
        message: 'Order Created Successfully',
      });
    } else {
      throw new ErrorHandler('Order not created', 400);
    }
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
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
