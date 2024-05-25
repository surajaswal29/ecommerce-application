import mongoose, { Schema, Model } from 'mongoose';
import { Constant, Interfaces } from '../utils';

const schema = new Schema<Interfaces.IUserAddress>({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  label: {
    type: String,
    validate: {
      validator: (value: string) => ['home', 'office', 'other'].includes(value),
      message: 'Please enter a valid label',
    },
    default: 'home',
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  priority: {
    type: String,
    validate: {
      validator: (value: string) => ['primary', 'secondary'].includes(value),
      message: 'Please enter a valid priority',
    },
    default: 'primary',
  },
});

const model = mongoose.model<Interfaces.IUserAddress>('UserAddress', schema, 'user_address');
export default model;
