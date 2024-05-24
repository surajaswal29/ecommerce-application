import mongoose, { Schema } from 'mongoose';
import { Interfaces } from '../utils';

const schema = new Schema<Interfaces.IOrderItem>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<Interfaces.IOrderItem>('OrderItem', schema, 'order_items');
export default model;
