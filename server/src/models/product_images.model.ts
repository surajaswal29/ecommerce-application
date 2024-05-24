import mongoose, { Schema } from 'mongoose';
import { Interfaces } from '../utils';

const schema = new Schema<Interfaces.IProductImages>(
  {
    url: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<Interfaces.IReview>('ProductImages', schema, 'product_images');
export default model;
