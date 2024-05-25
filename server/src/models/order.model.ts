import mongoose, { Schema } from 'mongoose';
import { Interfaces } from '../utils';

const schema = new Schema<Interfaces.IOrder>(
  {
    shipping_address: {
      type: Schema.Types.ObjectId,
      ref: 'UserAddress',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order_status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    },
    payment_status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid', 'failed'],
    },
    delivery_status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
    },
    total_price: {
      type: Number,
      required: [true, 'Total order price is required'],
    },
    total_items: {
      type: Number,
      required: [true, 'Total order items are required'],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<Interfaces.IOrder>('Order', schema, 'orders');
export default model;
