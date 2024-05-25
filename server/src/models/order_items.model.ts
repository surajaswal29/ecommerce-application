import mongoose, { Schema } from 'mongoose';
import { Interfaces } from '../utils';

const schema = new Schema<Interfaces.IOrderItem>(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order ID is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
    },
    total_price: {
      type: Number,
      required: [true, 'Total price is required.'],
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required.'],
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model<Interfaces.IOrderItem>('OrderItem', schema, 'order_items');
export default OrderItem;
