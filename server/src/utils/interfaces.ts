import { Document, ObjectId } from 'mongoose';

export interface IProductImages extends Document {
  url: string;
  product: ObjectId;
}

export interface IProductCategory extends Document {
  title: string;
}

export interface IReview extends Document {
  user: ObjectId;
  title?: string;
  comment?: string;
  rating: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  ratings: number;
  category: ObjectId;
  stock: number;
  reviewCount: number;
  seller: ObjectId;
  createdAt: Date;
}

interface ICartItem {
  product: ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  user: ObjectId;
  cartItems: ICartItem[];
  totalPrice: number;
  totalItems: number;
}

export interface IOrder extends Document {
  shipping_address: ObjectId;
  user: ObjectId;
  order_status: string;
  payment_status: string;
  delivery_status: string;
  total_price: number;
  total_items: number;
}

export interface IOrderItem extends Document {
  quantity: number;
  total_price: number;
  product: ObjectId;
}
