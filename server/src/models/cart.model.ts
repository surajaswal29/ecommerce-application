import mongoose, { Schema } from 'mongoose';
import { Interfaces } from '../utils';

const schema = new Schema<Interfaces.ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
});

// calculate total price & total cart items before saving
schema.pre<Interfaces.ICart>('save', function (next) {
  this.totalPrice = this.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  this.totalItems = this.cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  next();
});

//calculate total price & total cart items after updating document
schema.post<Interfaces.ICart>('save', function (cart: any) {
  const totalItems = cart.cartItems.reduce((acc: any, item: { quantity: any }) => acc + item.quantity, 0);
  const totalPrice = cart.cartItems.reduce(
    (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
    0
  );

  cart.totalItems = totalItems;
  cart.totalPrice = totalPrice;

  console.log(cart);
  cart.save();
});

const model = mongoose.model<Interfaces.ICart>('Cart', schema, 'cart');
export default model;
