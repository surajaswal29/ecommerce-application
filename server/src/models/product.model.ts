import mongoose, { Schema } from 'mongoose';
import { Interfaces } from '../utils';

const schema = new Schema<Interfaces.IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [8, 'maximum 8 length'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please enter product category'],
    },
    stock: {
      type: Number,
      required: [true, 'please enter product stock.'],
      maxLength: [4, 'max 4 characters.'],
      default: 1,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<Interfaces.IProduct>('Product', schema, 'products');
export default model;
